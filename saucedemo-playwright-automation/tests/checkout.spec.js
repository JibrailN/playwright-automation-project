const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users, products, checkoutInfo } = require('../utils/testData');

test.describe('Checkout Module', () => {
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await productsPage.addProductToCart(products.backpack);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  // TC_CHK_01
  test('valid checkout information should complete the order', async ({ page }) => {
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(page).toHaveURL(/checkout-complete.html/);
  });

  // TC_CHK_02
  test('missing first name should show a required-field error', async () => {
    await checkoutPage.fillInformation(checkoutInfo.missingFirstName);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  // TC_CHK_03
  test('missing last name should show a required-field error', async () => {
    await checkoutPage.fillInformation(checkoutInfo.missingLastName);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  // TC_CHK_04
  test('missing postal code should show a required-field error', async () => {
    await checkoutPage.fillInformation(checkoutInfo.missingPostalCode);
    await checkoutPage.continueCheckout();
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  // TC_CHK_05
  test('order summary total should equal item total plus tax', async () => {
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.continueCheckout();

    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(Math.round((subtotal + tax) * 100) / 100).toBeCloseTo(total, 2);
  });

  // TC_CHK_06
  test('cancel on Step One should return to the Cart page with items intact', async ({ page }) => {
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/cart.html/);
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  // TC_CHK_07
  test('cancel on the Overview step should return to the Products page', async ({ page }) => {
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.continueCheckout();
    await checkoutPage.cancel();
    await expect(page).toHaveURL(/inventory.html/);
  });

  // TC_CHK_09
  test('order confirmation page should display the completion message', async () => {
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader).toBeVisible();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  // TC_CHK_10
  test('"Back Home" after order completion should clear the cart', async ({ page }) => {
    await checkoutPage.fillInformation(checkoutInfo.valid);
    await checkoutPage.continueCheckout();
    await checkoutPage.finishOrder();
    await checkoutPage.backToProducts();

    await expect(page).toHaveURL(/inventory.html/);
    await expect(productsPage.cartBadge).toHaveCount(0);
  });
});
