const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");
  }

  async openProducts() {
    await this.page.getByRole("link", { name: /products/i }).first().click();
    await expect(this.page.getByText("All Products", { exact: false })).toBeVisible();
  }

  async searchProduct(term) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async verifySearchResultsContain(term) {
    await expect(this.page.getByText("Searched Products", { exact: false })).toBeVisible();
    await expect(this.page.locator(".productinfo p").first()).toContainText(new RegExp(term, "i"));
  }

  async verifyNoResults() {
    await expect(this.page.getByText("searched products", { exact: false })).toBeVisible();
    await expect(this.page.locator(".productinfo p")).toHaveCount(0);
  }

  async addFirstVisibleProductToCart() {
    const firstCard = this.page.locator(".product-image-wrapper").first();
    await firstCard.scrollIntoViewIfNeeded();
    await firstCard.hover();
    await firstCard.locator("text=Add to cart").first().click();
    await this.page.locator("button.close-modal, .close-modal").waitFor({ state: "visible" });
    await this.page.getByRole("button", { name: /continue shopping/i }).click();
  }
}

module.exports = ProductsPage;
