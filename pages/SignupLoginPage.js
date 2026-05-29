const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class SignupLoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async openSignupLogin() {
    await this.page.getByRole("link", { name: /signup \/ login/i }).click();
    await expect(this.page.getByText("New User Signup!", { exact: false })).toBeVisible();
  }

  async signup(name, email) {
    await this.fill("input[data-qa='signup-name']", name);
    await this.fill("input[data-qa='signup-email']", email);
    await this.click("button[data-qa='signup-button']");
  }

  async fillAccountDetails(user) {
    await this.click("#id_gender1");
    await this.fill("#password", user.password);
    await this.page.selectOption("#days", user.birthDay);
    await this.page.selectOption("#months", user.birthMonth);
    await this.page.selectOption("#years", user.birthYear);
    await this.fill("#first_name", user.firstName);
    await this.fill("#last_name", user.lastName);
    await this.fill("#address1", user.address);
    await this.page.selectOption("#country", user.country);
    await this.fill("#state", user.state);
    await this.fill("#city", user.city);
    await this.fill("#zipcode", user.zipCode);
    await this.fill("#mobile_number", user.mobileNumber);
  }

  async createAccount() {
    await this.click("button[data-qa='create-account']");
    await expect(this.page.getByText("Account Created!", { exact: false })).toBeVisible();
    await this.click("a[data-qa='continue-button']");
  }

  async verifyLoggedIn(name) {
    await expect(this.page.getByText(`Logged in as ${name}`, { exact: false })).toBeVisible();
  }

  async login(email, password) {
    await this.fill("input[data-qa='login-email']", email);
    await this.fill("input[data-qa='login-password']", password);
    await this.click("button[data-qa='login-button']");
  }

  async verifyLoginError() {
    await expect(this.page.getByText("Your email or password is incorrect!", { exact: false })).toBeVisible();
  }

  async deleteAccount() {
    await this.page.getByRole("link", { name: /delete account/i }).click();
    await expect(this.page.getByText("Account Deleted!", { exact: false })).toBeVisible();
    await this.click("a[data-qa='continue-button']");
  }
}

module.exports = SignupLoginPage;
