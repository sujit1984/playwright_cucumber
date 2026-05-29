const common = [
  "features/**/*.feature",
  "--require features/step_definitions/**/*.js",
  "--require features/hooks/**/*.js",
  "--publish false",
  "--parallel 4",
  "--retry 1",
  "--format progress-bar",
  `--format json:${process.env.REPORT_JSON || "reports/json/cucumber-report.json"}`,
  "--format allure-cucumberjs/reporter",
].join(" ");

module.exports = {
  default: common,
};
