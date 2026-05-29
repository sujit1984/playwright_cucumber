const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class HomePage extends BasePage {
  constructor(page, baseUrl) {
    super(page);
    this.baseUrl = baseUrl;
    this.logo = this.page.locator("img[alt='Website for automation practice']");
    this.subscriptionInput = this.page.locator("#susbscribe_email");
    this.subscriptionButton = this.page.locator("#subscribe");
  }

  async open() {
    await this.goto(this.baseUrl);
  }

  async verifyLandingPage() {
    await expect(this.page).toHaveTitle(/Automation Exercise/i);
    await expect(this.logo).toBeVisible();
  }

  async goToMenu(menuLabel) {
    await this.page.getByRole("link", { name: new RegExp(menuLabel, "i") }).first().click();
  }

  async subscribe(email) {
    await this.subscriptionInput.scrollIntoViewIfNeeded();
    await this.subscriptionInput.fill(email);
    await this.subscriptionButton.click();
  }

  async verifySubscriptionSuccess() {
    await expect(this.page.getByText("You have been successfully subscribed!", { exact: false })).toBeVisible();
  }
}

module.exports = HomePage;
