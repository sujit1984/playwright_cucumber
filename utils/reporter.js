const path = require("path");
const fs = require("fs");
const report = require("multiple-cucumber-html-reporter");

function generateHtmlReport() {
  const jsonReport = path.resolve(process.cwd(), "reports", "cucumber-report.json");

  if (!fs.existsSync(jsonReport)) {
    return;
  }

  report.generate({
    jsonDir: path.resolve(process.cwd(), "reports"),
    reportPath: path.resolve(process.cwd(), "reports", "html"),
    reportName: "Automation Exercise Cucumber Report",
    pageTitle: "Playwright Cucumber Execution Report",
    displayDuration: true,
    metadata: {
      browser: {
        name: process.env.BROWSER || "chromium",
        version: "latest",
      },
      device: "Local or CI",
      platform: {
        name: process.platform,
      },
    },
    customData: {
      title: "Run info",
      data: [
        { label: "Project", value: "playwright_cucumber" },
        { label: "Base URL", value: process.env.BASE_URL || "https://www.automationexercise.com" },
        { label: "Executed", value: new Date().toUTCString() },
      ],
    },
  });
}

module.exports = {
  generateHtmlReport,
};
