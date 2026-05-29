const {
  Before,
  After,
  BeforeAll,
  Status,
  setDefaultTimeout,
  setWorldConstructor,
  World,
} = require("@cucumber/cucumber");
const path = require("path");
const fs = require("fs");
const env = require("../../config/env");
const { launchBrowser, closeBrowser } = require("../../utils/browserManager");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    this.browser = null;
    this.context = null;
    this.page = null;
    this.testData = {};
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(env.defaultTimeout);

Before(async function () {
  const session = await launchBrowser();
  this.browser = session.browser;
  this.context = session.context;
  this.page = session.page;
});

After(async function (scenario) {
  if (scenario.result?.status === Status.FAILED && env.screenshotOnFailure) {
    const dir = path.resolve(process.cwd(), "reports", "screenshots");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileName = `${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "_")}_${Date.now()}.png`;
    const filePath = path.join(dir, fileName);
    await this.page.screenshot({ path: filePath, fullPage: true });

    const screenshot = fs.readFileSync(filePath);
    await this.attach(screenshot, "image/png");
  }

  await closeBrowser(this);
});

BeforeAll(function () {
  const reportsDir = path.resolve(process.cwd(), "reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const jsonDir = path.resolve(process.cwd(), "reports", "json");
  if (!fs.existsSync(jsonDir)) {
    fs.mkdirSync(jsonDir, { recursive: true });
  }
});
