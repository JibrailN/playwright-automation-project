class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.continueShoppingButton = page.locator('#continue-shopping');
    this.checkoutButton = page.locator('#checkout');
  }

  async getItemCount() {
    return this.cartItems.count();
  }

  async getItemNames() {
    return this.cartItemNames.allTextContents();
  }

  removeButtonByName(productName) {
    const slug = productName
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\(|\)/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async removeItem(productName) {
    await this.removeButtonByName(productName).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
