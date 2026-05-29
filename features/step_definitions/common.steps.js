const { Given, When, Then } = require("@cucumber/cucumber");
const path = require("path");
const env = require("../../config/env");
const HomePage = require("../../pages/HomePage");
const SignupLoginPage = require("../../pages/SignupLoginPage");
const ProductsPage = require("../../pages/ProductsPage");
const CartPage = require("../../pages/CartPage");
const ContactUsPage = require("../../pages/ContactUsPage");
const { buildUser, uniqueEmail, contactData } = require("../../utils/testData");

Given("the user opens the automation exercise home page", async function () {
  this.homePage = new HomePage(this.page, env.baseUrl);
  this.signupLoginPage = new SignupLoginPage(this.page);
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  this.contactUsPage = new ContactUsPage(this.page);

  await this.homePage.open();
});

Then("the home page should be displayed", async function () {
  await this.homePage.verifyLandingPage();
});

When("the user subscribes with a unique email address", async function () {
  this.subscriptionEmail = uniqueEmail("subscription");
  await this.homePage.subscribe(this.subscriptionEmail);
});

Then("a subscription success message should be shown", async function () {
  await this.homePage.verifySubscriptionSuccess();
});

When("the user navigates to signup login page", async function () {
  await this.signupLoginPage.openSignupLogin();
});

When("the user registers with valid details", async function () {
  this.user = buildUser();
  await this.signupLoginPage.openSignupLogin();
  await this.signupLoginPage.signup(this.user.name, this.user.email);
  await this.signupLoginPage.fillAccountDetails(this.user);
  await this.signupLoginPage.createAccount();
});

Then("the user should be logged in", async function () {
  await this.signupLoginPage.verifyLoggedIn(this.user.firstName);
});

Then("the user deletes the account", async function () {
  await this.signupLoginPage.deleteAccount();
});

When("the user logs in with invalid credentials", async function () {
  await this.signupLoginPage.login("invalid.user@example.com", "wrong-password");
});

Then("an authentication error should be displayed", async function () {
  await this.signupLoginPage.verifyLoginError();
});

When("the user opens products page", async function () {
  await this.productsPage.openProducts();
});

When("searches for product keyword {string}", async function (keyword) {
  this.searchKeyword = keyword;
  await this.productsPage.searchProduct(keyword);
});

Then("relevant searched products should be shown for {string}", async function (keyword) {
  await this.productsPage.verifySearchResultsContain(keyword);
});

Then("no products should be returned", async function () {
  await this.productsPage.verifyNoResults();
});

When("adds the first listed product to cart", async function () {
  await this.productsPage.addFirstVisibleProductToCart();
});

When("opens cart page", async function () {
  await this.cartPage.openCartFromMenu();
});

Then("the cart should contain products", async function () {
  await this.cartPage.verifyCartHasItems();
});

When("the user opens contact us page", async function () {
  await this.contactUsPage.openContactUs();
});

When("submits the contact form with valid data", async function () {
  const data = contactData();
  data.uploadFilePath = path.resolve(process.cwd(), "README.md");
  await this.contactUsPage.submitContactForm(data);
});

Then("a contact form success message should be shown", async function () {
  await this.contactUsPage.verifySuccessMessage();
});
