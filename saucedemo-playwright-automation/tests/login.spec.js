const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');
const { users } = require('../utils/testData');

test.describe('Login Module', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // TC_LOGIN_01
  test('valid credentials should log the user into the Products page', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory.html/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // TC_LOGIN_02
  test('invalid password should show a credential mismatch error', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('do not match any user');
  });

  // TC_LOGIN_03
  test('locked-out user should be blocked from logging in', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText('has been locked out');
  });

  // TC_LOGIN_04
  test('empty username should show a required-field error', async () => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  // TC_LOGIN_05
  test('empty password should show a required-field error', async () => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  // TC_LOGIN_06
  test('empty username and password should show username-required error first', async () => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  // TC_LOGIN_10
  test('logged-in user should be able to log out successfully', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory.html/);

    await loginPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    const productsPage = new ProductsPage(page);
    await expect(productsPage.pageTitle).not.toBeVisible();
  });
});
