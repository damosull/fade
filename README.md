# Automation Project

This project contains automated tests for the FADE system using [Playwright](https://playwright.dev/) in **TypeScript**. It’s structured for use with **VSCode Workspaces** to support a modular test architecture.

## Prerequisites

- [Node Version Manager](https://github.com/nvm-sh/nvm)
- [Visual Studio Code](https://code.visualstudio.com/)

## Installation

1. Open the workspace for full context across all projects:

```sh
code fade-wm.code-workspace
```

This gives you visibility across folders with unified settings and linting.

2. Install Dependencies & Playwright Browsers:

```sh
npm install && npx playwright install
```

## Running & Debugging Tests using Playwright Test Explorer

All tests in this framework are run using the Playwright VSCode extension. Here’s how to run, debug, inspect, and select locators without leaving your editor.

### Running Tests

1. Open the Testing panel in VSCode by clicking the beaker icon on the sidebar or pressing `Cmd+Shift+P` and searching for `Show Test Explorer`.
2. In the playwright panel, click the gear icon ⚙️ next to `CONFIGS`
3. Select the test project (if not already selected)
4. Click the ▶️ icon next to a specific test or suite to run it.

### Debugging Tests

Click the 🐞 bug icon next to a test to run it in debug mode. This opens the Playwright Inspector, allowing you to:

- Step through each test action
- View browser state
- Pause/resume execution
- Inspect selectors in real-time

### Viewing Traces (On Test Failure)

Playwright automatically records traces on failure.

1. In the Test Explorer, click the 📂 folder icon next to a failed test.
2. Choose Show Trace.
3. This opens the Trace Viewer inside VSCode (no CLI needed).

You can view:

- DOM snapshots
- Console logs
- Network requests
- Timings and actions

### Locator Selection

You can use the extension’s code generation tool to explore and pick locators:

1. Press `Cmd+Shift+P` → search for `Playwright: Pick Locator`
2. Enter the app URL
3. A browser window opens - hover or click on elements to get robust locators (like getByRole, getByText)
4. Copy and paste the suggested locator into your test

## Running Tests using CLI

### Run All Tests

To run all tests in headless mode, use the following command:

```sh
npx playwright test
```

To run all tests in headed mode, use the following command:

```sh
npx playwright test --headed
```

### Run a Specific Test in Headed Mode

To run a specific test file in headed mode, use the following command:

```sh
npx playwright test tests/uatfade.spec.ts --headed
npx playwright test tests/incomeRec.spec.ts --headed
```

### Run Tests Using npm Script

You can also run the tests using the npm script defined in the `package.json` file:

```sh
npm run account-test:headed
npm run income-rec-test:headed
```

## Project Structure

- `tests/`: Contains the test files.
- `pages/`: Contains the page object models.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or have suggestions for improvements.
