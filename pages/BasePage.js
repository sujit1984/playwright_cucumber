class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async clickByRole(role, name) {
    await this.page.getByRole(role, { name }).click();
  }

  async fill(selector, value) {
    await this.page.locator(selector).fill(value);
  }

  async click(selector) {
    await this.page.locator(selector).click();
  }

  async expectTextVisible(text) {
    await this.page.getByText(text, { exact: false }).first().waitFor({ state: "visible" });
  }
}

module.exports = BasePage;
