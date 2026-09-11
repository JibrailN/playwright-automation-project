class ProductDetailPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.backButton = page.locator('#back-to-products');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
  }

  async getProductName() {
    return this.productName.textContent();
  }

  async goBackToProducts() {
    await this.backButton.click();
  }
}

module.exports = { ProductDetailPage };
