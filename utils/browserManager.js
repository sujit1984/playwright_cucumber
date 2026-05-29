const { chromium, firefox, webkit } = require("playwright");
const env = require("../config/env");

const browserMap = {
  chromium,
  chrome: chromium,
  firefox,
  webkit,
  safari: webkit,
};

async function launchBrowser() {
  const browserType = browserMap[env.browserName];

  if (!browserType) {
    throw new Error(
      `Unsupported BROWSER='${env.browserName}'. Use chromium|firefox|webkit or chrome|safari.`
    );
  }

  const browser = await browserType.launch({
    headless: env.headless,
    slowMo: env.slowMo,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
  });

  const page = await context.newPage();
  page.setDefaultTimeout(env.defaultTimeout);

  return { browser, context, page };
}

async function closeBrowser(world) {
  if (world?.context) {
    await world.context.close();
  }

  if (world?.browser) {
    await world.browser.close();
  }
}

module.exports = {
  launchBrowser,
  closeBrowser,
};
