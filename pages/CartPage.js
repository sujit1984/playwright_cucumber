const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async openCartFromMenu() {
    await this.page.getByRole("link", { name: /cart/i }).first().click();
  }

  async verifyCartHasItems() {
    await expect(this.page.locator(".cart_description").first()).toBeVisible();
  }
}

module.exports = CartPage;
