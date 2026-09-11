const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');
const { users, products, sortOptions } = require('../utils/testData');

test.describe('Product Listing & Filters Module', () => {
  let productsPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).toBeVisible();
  });

  // TC_PROD_01
  test('all 6 products should be displayed after login', async () => {
    await expect(productsPage.inventoryItems).toHaveCount(6);
  });

  // TC_PROD_02
  test('sorting by Name (A to Z) should order products alphabetically ascending', async () => {
    await productsPage.sortBy(sortOptions.nameAZ);
    const names = await productsPage.getAllProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  // TC_PROD_03
  test('sorting by Name (Z to A) should order products alphabetically descending', async () => {
    await productsPage.sortBy(sortOptions.nameZA);
    const names = await productsPage.getAllProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    expect(names).toEqual(sorted);
  });

  // TC_PROD_04
  test('sorting by Price (low to high) should order products ascending by price', async () => {
    await productsPage.sortBy(sortOptions.priceLowHigh);
    const prices = await productsPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // TC_PROD_05
  test('sorting by Price (high to low) should order products descending by price', async () => {
    await productsPage.sortBy(sortOptions.priceHighLow);
    const prices = await productsPage.getAllProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  // TC_PROD_06
  test('clicking a product should open its detail page', async ({ page }) => {
    await productsPage.openProductByName(products.backpack);
    const detailPage = new ProductDetailPage(page);
    await expect(detailPage.productName).toHaveText(products.backpack);
  });

  // TC_PROD_07
  test('"Back to products" should return to the full listing page', async ({ page }) => {
    await productsPage.openProductByName(products.backpack);
    const detailPage = new ProductDetailPage(page);
    await detailPage.goBackToProducts();
    await expect(productsPage.pageTitle).toBeVisible();
    await expect(productsPage.inventoryItems).toHaveCount(6);
  });
});
