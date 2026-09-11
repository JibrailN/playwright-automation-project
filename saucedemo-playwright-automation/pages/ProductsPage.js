class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.backToProductsButton = page.locator('#back-to-products');
  }

  async isLoaded() {
    return this.pageTitle.isVisible();
  }

  async getProductCount() {
    return this.inventoryItems.count();
  }

  async sortBy(optionValue) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async getAllProductNames() {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getAllProductPrices() {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map((p) => parseFloat(p.replace('$', '')));
  }

  addToCartButtonByName(productName) {
    const slug = this.toSlug(productName);
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }

  removeButtonByName(productName) {
    const slug = this.toSlug(productName);
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async addProductToCart(productName) {
    await this.addToCartButtonByName(productName).click();
  }

  async removeProductFromCart(productName) {
    await this.removeButtonByName(productName).click();
  }

  async openProductByName(productName) {
    await this.page.locator('.inventory_item_name', { hasText: productName }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return parseInt(await this.cartBadge.textContent(), 10);
  }

  /** Converts a display product name into SauceDemo's kebab-case data-test slug. */
  toSlug(name) {
    return name
      .toLowerCase()
      .replace(/\./g, '')
      .replace(/\(|\)/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

module.exports = { ProductsPage };
