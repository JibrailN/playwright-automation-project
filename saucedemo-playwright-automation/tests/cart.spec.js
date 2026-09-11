const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { users, products } = require('../utils/testData');

test.describe('Shopping Cart Module', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toBeVisible();
  });

  // TC_CART_01
  test('adding a single product should update the cart badge to 1', async () => {
    await productsPage.addProductToCart(products.backpack);
    await expect(productsPage.cartBadge).toHaveText('1');
    await expect(productsPage.removeButtonByName(products.backpack)).toBeVisible();
  });

  // TC_CART_02
  test('adding multiple products should update the cart badge accordingly', async () => {
    await productsPage.addProductToCart(products.backpack);
    await productsPage.addProductToCart(products.bikeLight);
    await productsPage.addProductToCart(products.boltTShirt);
    await expect(productsPage.cartBadge).toHaveText('3');
  });

  // TC_CART_03
  test('removing an item from the Products page should decrease the cart badge', async () => {
    await productsPage.addProductToCart(products.backpack);
    await expect(productsPage.cartBadge).toHaveText('1');

    await productsPage.removeProductFromCart(products.backpack);
    await expect(productsPage.cartBadge).toHaveCount(0);
    await expect(productsPage.addToCartButtonByName(products.backpack)).toBeVisible();
  });

  // TC_CART_04
  test('removing an item from the Cart page should update the cart list', async ({ page }) => {
    await productsPage.addProductToCart(products.backpack);
    await productsPage.addProductToCart(products.bikeLight);
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(2);

    await cartPage.removeItem(products.backpack);
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  // TC_CART_05
  test('cart page should display an empty state with no badge when no items are added', async ({ page }) => {
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(productsPage.cartBadge).toHaveCount(0);
  });

  // TC_CART_06
  test('cart item details should match what was added from the Products page', async ({ page }) => {
    await productsPage.addProductToCart(products.bikeLight);
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    const names = await cartPage.getItemNames();
    expect(names).toContain(products.bikeLight);
  });

  // TC_CART_07
  test('"Continue Shopping" should return to Products page with cart intact', async ({ page }) => {
    await productsPage.addProductToCart(products.backpack);
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.continueShopping();

    await expect(productsPage.pageTitle).toBeVisible();
    await expect(productsPage.cartBadge).toHaveText('1');
  });
});
