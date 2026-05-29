const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class ContactUsPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async openContactUs() {
    await this.page.getByRole("link", { name: /contact us/i }).click();
    await expect(this.page.getByText("Get In Touch", { exact: false })).toBeVisible();
  }

  async submitContactForm(data) {
    await this.fill("input[data-qa='name']", data.name);
    await this.fill("input[data-qa='email']", data.email);
    await this.fill("input[data-qa='subject']", data.subject);
    await this.fill("textarea[data-qa='message']", data.message);
    if (data.uploadFilePath) {
      await this.page.setInputFiles("input[name='upload_file']", data.uploadFilePath);
    }

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    await this.click("input[data-qa='submit-button']");
  }

  async verifySuccessMessage() {
    const successBanner = this.page.locator(".status.alert.alert-success");
    await expect(successBanner).toHaveCount(1);
  }
}

module.exports = ContactUsPage;
