const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const env = {
  baseUrl: process.env.BASE_URL || "https://www.automationexercise.com",
  browserName: (process.env.BROWSER || "chromium").toLowerCase(),
  headless: (process.env.HEADLESS || "true").toLowerCase() === "true",
  slowMo: Number(process.env.SLOW_MO || 0),
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT || 30000),
  screenshotOnFailure:
    (process.env.SCREENSHOT_ON_FAILURE || "true").toLowerCase() === "true",
};

module.exports = env;
