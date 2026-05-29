const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const browser = process.env.BROWSER || "chrome";
const tags = process.env.TAGS || "";
const packName = process.env.PACK_NAME || "full-regression";

const reportsJsonDir = path.resolve(process.cwd(), "reports", "json");
if (!fs.existsSync(reportsJsonDir)) {
  fs.mkdirSync(reportsJsonDir, { recursive: true });
}

const reportFile =
  process.env.REPORT_JSON ||
  path.join(reportsJsonDir, `cucumber-${browser}-${packName}.json`);

const cucumberBinary =
  process.platform === "win32"
    ? path.resolve(process.cwd(), "node_modules", ".bin", "cucumber-js.cmd")
    : path.resolve(process.cwd(), "node_modules", ".bin", "cucumber-js");

const args = [];
if (tags) {
  args.push("--tags", tags);
}

const result = spawnSync(cucumberBinary, args, {
  stdio: "inherit",
  env: {
    ...process.env,
    REPORT_JSON: reportFile,
  },
});

process.exit(result.status || 0);
