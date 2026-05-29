# Playwright + Cucumber Automation Framework (JavaScript)

This repository provides an end-to-end QA automation framework for https://www.automationexercise.com using:
- Playwright for browser automation
- Cucumber (BDD) for feature-driven tests
- JavaScript (CommonJS)
- Parallel execution (scenario-level and browser-level)
- HTML reporting (internal)
- Allure reporting (external/shareable)
- GitHub Actions CI/CD
- Docker containerization

## 1. Framework Highlights

- Playwright + Cucumber + JavaScript implementation
- Reusable Page Object Model (POM)
- Cucumber hooks with screenshot-on-failure support
- Scenario-level parallelization via `cucumber-js --parallel`
- Browser matrix support: Chrome, Firefox, Safari (WebKit)
- Internal HTML report generation via `multiple-cucumber-html-reporter`
- External Allure report generation via `allure-commandline`
- CI pipeline using GitHub Actions with artifact upload
- Docker and docker-compose support for portable execution

## 2. Repository Structure

```text
.
├── .github/workflows/ci.yml
├── config/
│   └── env.js
├── features/
│   ├── authentication.feature
│   ├── contact_us.feature
│   ├── home.feature
│   ├── products_cart.feature
│   ├── hooks/
│   │   └── hooks.js
│   └── step_definitions/
│       └── common.steps.js
├── pages/
│   ├── BasePage.js
│   ├── CartPage.js
│   ├── ContactUsPage.js
│   ├── HomePage.js
│   ├── ProductsPage.js
│   └── SignupLoginPage.js
├── utils/
│   ├── browserManager.js
│   ├── runCucumber.js
│   ├── reporter.js
│   └── testData.js
├── .env.example
├── .gitignore
├── cucumber.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## 3. Covered Test Scenarios

### Home and Subscription
- Home page loads successfully
- Newsletter subscription succeeds

### Authentication
- Register new user with unique data and validate login state
- Delete created account
- Negative login with invalid credentials

### Product and Cart
- Search with valid product keyword
- Search with non-existing product keyword (edge case)
- Add first product to cart and verify cart contents

### Contact Us
- Submit contact form with valid details and file attachment

## 4. Coverage and Edge-Case Strategy

The suite includes both happy-path and negative/edge scenarios:
- Invalid login credentials
- Non-existing product search
- Unique email generation to avoid data collision
- Screenshot capture on failure to aid debugging
- Multi-browser execution to detect browser-specific regressions

You can keep adding edge-case scenarios by introducing new `.feature` files under `features/` and corresponding steps under `features/step_definitions/`.

## 5. Prerequisites

- Node.js 20+
- npm 10+
- Git
- For local Allure viewing:
  - Java Runtime (required by Allure CLI)

## 6. Installation and Setup

### 6.1 Clone and install

```bash
git clone https://github.com/sujit1984/playwright_cucumber.git
cd playwright_cucumber
npm ci
npx playwright install
```

### 6.2 Configure environment

```bash
cp .env.example .env
```

Default environment values:

```env
BASE_URL=https://www.automationexercise.com
BROWSER=chromium
HEADLESS=true
SLOW_MO=0
DEFAULT_TIMEOUT=30000
SCREENSHOT_ON_FAILURE=true
```

## 7. Run Commands

### Tag packs

- `@smoke`: Fast build verification pack
- `@sanity`: Critical business-flow pack
- `full-regression`: Entire suite (primarily `@regression` scenarios and untagged scenarios)

### Single-browser execution

```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Tag-pack execution (all browsers)

```bash
npm run test:pack:smoke
npm run test:pack:sanity
npm run test:pack:full-regression
```

### All browsers (sequential)

```bash
npm run test:all
```

### All browsers (parallel)

```bash
npm run test:all:parallel
```

### Internal HTML report only

```bash
npm run report:html
```

The HTML report now reads all JSON files from `reports/json/`.

### Allure report generation and open

```bash
npm run allure:generate
npm run allure:open
```

### CI equivalent local run

```bash
npm run test:ci
```

## 8. Parallel Execution Model

This framework supports two layers of parallelism:

1. Scenario-level parallelism:
- Configured in `cucumber.js` using `--parallel 4`
- Multiple scenarios run concurrently within a browser suite

2. Browser-level parallelism:
- `npm run test:all:parallel` executes Chrome, Firefox, and Safari suites concurrently
- GitHub Actions matrix runs each browser job in parallel

## 9. Reporting

### 9.1 Internal Reporting (HTML)

Generated at:
- `reports/html/index.html`

Also includes:
- JSON output: `reports/json/cucumber-<browser>-<pack>.json`
- Failure screenshots: `reports/screenshots/`

### 9.1.1 Report Accuracy in Parallel Runs

To avoid incorrect totals in `reports/html/index.html`, each run writes to an isolated JSON file in `reports/json/` (for example, `cucumber-chrome-smoke.json`).
The HTML report is generated after execution completes and merges all JSON files in that folder.

### 9.2 External Reporting (Allure)

Generated artifacts:
- Raw results: `allure-results/`
- Final report: `allure-report/`

Commands:

```bash
npm run allure:generate
npm run allure:open
```

In CI, Allure result files and final report are uploaded as build artifacts.

## 10. CI/CD with GitHub Actions

Workflow file:
- `.github/workflows/ci.yml`

### 10.1 Trigger Events and Branch Strategy

The CI/CD pipeline is triggered automatically on code changes and supports multiple scenarios:

#### **Scenario 1: Feature Branch Push** (Smoke Tests)
**When:** Developer pushes to `feature/*` branch
**Tests Run:** ✅ Smoke pack only (`@smoke` scenarios)
**Duration:** ~5-7 minutes (fast feedback loop)
**Browsers:** Chrome, Firefox, Safari (parallel matrix)
**Artifacts:**
- Cucumber HTML report (smoke)
- Allure results (smoke)

**Purpose:** Quick validation that new code doesn't break critical paths.

**Example:**
```bash
git checkout -b feature/new-payment-flow
git push origin feature/new-payment-flow
# → CI auto-triggers → runs smoke tests → reports results
```

#### **Scenario 2: Pull Request to Main** (Sanity Tests)
**When:** Developer opens/updates PR targeting `main` branch
**Tests Run:** ✅ Sanity pack (`@sanity` scenarios)
**Duration:** ~8-10 minutes
**Browsers:** Chrome, Firefox, Safari (parallel matrix)
**Artifacts:**
- Cucumber HTML report (sanity)
- Allure results (sanity)
- Status checks in PR (pass/fail indicator)

**Purpose:** Validate business-critical flows before merge approval.

**Example:**
```bash
git push origin feature/new-payment-flow
# → Creates/updates PR on GitHub
# → CI auto-triggers → runs sanity tests → blocks merge on failure
```

#### **Scenario 3: Push to Main Branch** (Full Regression)
**When:** Code is merged to `main` (or developer directly pushes to main)
**Tests Run:** ✅ Full regression suite (all scenarios)
**Duration:** ~15-20 minutes (comprehensive coverage)
**Browsers:** Chrome, Firefox, Safari (parallel matrix)
**Artifacts:**
- Cucumber HTML reports (all packs)
- Allure results (all packs)
- Merged Allure report
- Build artifact archive

**Purpose:** Comprehensive testing before production release.

**Example:**
```bash
git merge feature/new-payment-flow
# → Automatically triggers on main branch
# → Runs complete test suite
# → Generates comprehensive reports
```

#### **Scenario 4: Hotfix Branch Push** (Smoke Tests)
**When:** Developer pushes to `hotfix/*` branch
**Tests Run:** ✅ Smoke pack (`@smoke` scenarios)
**Duration:** ~5-7 minutes (fast validation)
**Browsers:** Chrome, Firefox, Safari
**Artifacts:**
- Cucumber HTML report (smoke)
- Allure results (smoke)

**Purpose:** Rapid validation of production hotfixes.

**Example:**
```bash
git checkout -b hotfix/payment-crash
git push origin hotfix/payment-crash
# → CI auto-triggers → runs smoke tests
```

#### **Scenario 5: Manual Trigger** (User-Selected Pack)
**When:** Developer manually triggers workflow from GitHub UI
**Tests Run:** ✅ User-selected pack (smoke, sanity, or full-regression)
**Duration:** Depends on selected pack (5-20 minutes)
**Browsers:** Chrome, Firefox, Safari
**Artifacts:** Corresponding report artifacts

**Purpose:** On-demand testing without code commit.

**How to trigger manually:**
1. Go to **Actions** tab in GitHub
2. Select **Playwright Cucumber CI** workflow
3. Click **Run workflow**
4. Select desired test pack from dropdown
5. Click **Run workflow**

### 10.2 Pipeline Behavior and Artifact Generation

**Parallel Job Execution:**
```
Feature Branch Push:
  ├─ Smoke Tests (9 workers: 3 browsers × 3 scenarios)
  └─ Completes in ~6 min

Pull Request to Main:
  ├─ Sanity Tests (6 workers: 3 browsers × 2 scenarios)
  └─ Completes in ~8 min

Push to Main:
  ├─ Smoke Tests (9 workers) [parallel]
  ├─ Sanity Tests (6 workers) [parallel]
  ├─ Full Regression Tests (24+ workers) [parallel]
  └─ Aggregate Allure Report [waits for all]
  └─ Total time: ~18 min (overlapped execution)
```

**Uploads:**
- Cucumber HTML report per browser per pack
- Allure results per browser per pack
- Merged Allure report (consolidated across all packs)
- Failure screenshots automatically attached

**Status Checks in PR:**
- ❌ PR blocks merge if sanity tests fail
- ✅ PR shows all job statuses in checks section
- 📊 Report artifacts available for download

### 10.3 Environment and Configuration

All CI jobs use:
- **Node.js:** 20 (cached dependencies)
- **Playwright Browsers:** Chrome, Firefox, Safari (pre-installed)
- **Base URL:** `https://www.automationexercise.com`
- **Headless Mode:** `true` (no UI rendering)
- **Retry Logic:** 1 retry per scenario on failure

### 10.4 Report Artifact Retention

- **Cucumber HTML Reports:** 90 days (GitHub default)
- **Allure Reports:** 90 days
- **Failure Screenshots:** Embedded in reports
- **Build Logs:** Searchable in GitHub Actions UI

## 11. Containerization

### Build image

```bash
docker build -t playwright-cucumber .
```

### Run from image

```bash
docker run --rm \
  -v "$(pwd)/reports:/app/reports" \
  -v "$(pwd)/allure-results:/app/allure-results" \
  -v "$(pwd)/allure-report:/app/allure-report" \
  playwright-cucumber
```

### Run using docker-compose

```bash
docker compose up --build
```

This ensures the framework can run consistently across machines without local dependency drift.

## 12. Maintenance and Extension Guidance

- Add new feature files under `features/`
- Keep step definitions reusable and business-readable
- Add/extend page objects under `pages/`
- Keep selectors centralized in page objects for maintainability
- Use tags (`@smoke`, `@regression`, `@auth`, etc.) to create targeted pipelines

## 13. Notes

- Safari execution is implemented through Playwright WebKit (`BROWSER=safari` alias).
- The suite uses dynamic test data generation for user creation flows.
- Failure screenshots are automatically attached in Cucumber hooks.

