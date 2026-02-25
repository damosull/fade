import { type Locator, type Page, expect } from '@playwright/test';

/**
 * Clicks an element after confirming it’s visible.
 */
export async function clickWhenVisible(locator: Locator, timeout?: number): Promise<void> {
  await expect(locator).toBeVisible({ timeout });
  await locator.click();
}

/**
 * Selects an option from a dropdown list by visible text.
 */
export async function chooseDropdownOption(
  page: Page,
  optionName: string,
  exact: boolean = false
): Promise<void> {
  const expandedCombos = page.locator('[role="combobox"][aria-expanded="true"]');
  const expandedCount = await expandedCombos.count();

  if (expandedCount === 0) {
    throw new Error(
      'No expanded combobox found. Click the dropdown trigger before calling chooseDropdownOption().'
    );
  }
  if (expandedCount > 1) {
    console.warn(`Found ${expandedCount} expanded comboboxes. Using the first one.`);
  }

  const combo = expandedCombos.first();
  await expect(combo).toBeVisible();

  let listboxId = await combo.getAttribute('aria-controls');
  let listbox: Locator;

  if (listboxId) {
    listbox = page.locator(`#${listboxId}`);
  } else {
    console.warn('No aria-controls found. Falling back to visible listbox…');
    listbox = page.locator('[role="listbox"]:visible').first();
  }

  await expect(listbox).toBeVisible();

  const allOptions = listbox.getByRole('option');
  await expect(allOptions.first()).toBeVisible();

  const texts = await allOptions.allInnerTexts();

  const matcher = (text: string) => {
    const trimmed = text.trim();
    return exact ? trimmed === optionName : trimmed.includes(optionName);
  };

  const index = texts.findIndex(matcher);

  if (index === -1) {
    console.warn('No option matched. Current listbox options:', texts);
    throw new Error(`Could not find option with text "${optionName}" in dropdown.`);
  }

  const option = allOptions.nth(index);
  await option.click();
}

/**
 * Opens a dropdown, then selects an option.
 */
export async function selectFromDropdown(
  page: Page,
  openLocator: Locator,
  optionName: string,
  exact = false
): Promise<void> {
  await clickWhenVisible(openLocator);
  await chooseDropdownOption(page, optionName, exact);
}

/**
 * Wait for non-blocking overlays or spinners to disappear.
 */
export async function waitForNonBlockingUI(page: Page, timeoutMs = 5000): Promise<void> {
  const possibleBlockers = [
    page.locator('div[role="status"]'),
    page.locator('div[aria-live="polite"]'),
  ];

  for (const blocker of possibleBlockers) {
    try {
      const isVisible = await blocker.isVisible({ timeout: 500 });
      if (isVisible) {
        await blocker.waitFor({ state: 'hidden', timeout: timeoutMs });
      }
    } catch {
      // ignore if not present
    }
  }
}

/**
 * Waits for all visible spinning SVG elements to disappear.
 * Useful for ensuring loading states have completed before proceeding.
 */
export async function waitForSpinnersToDisappear(page: Page, timeout = 120000): Promise<void> {
  await expect
    .poll(
      async () => {
        // eslint-disable-next-line playwright/no-eval
        return await page.$$eval(
          'svg.animate-spin',
          (svgs) =>
            svgs.filter((svg) => {
              // eslint-disable-next-line no-undef
              const style = window.getComputedStyle(svg);
              const rect = svg.getBoundingClientRect();

              return (
                style.display !== 'none' &&
                style.visibility !== 'hidden' &&
                rect.width > 0 &&
                rect.height > 0
              );
            }).length
        );
      },
      { timeout }
    )
    .toBe(0);
}

/**
 * Finds a Service Case link by (fuzzy) text, safely escaping special characters.
 */
export function findServiceCaseLink(page: Page, selectServiceCase: string): Locator {
  const escaped = selectServiceCase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return page.locator('a[href*="/serviceCases/"]').getByText(new RegExp(escaped, 'i'));
}

/**
 * Select a date relative to today in a React Datepicker that uses
 * aria-labels like: "Choose Friday, November 7th, 2025".
 */
export async function selectDateByOffset(
  page: Page,
  datePickerDropdown: Locator,
  daysOffset = 0
): Promise<void> {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  await datePickerDropdown.click();
  await page.locator('.react-datepicker').waitFor();

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayName = dayNames[date.getDay()];
  const monthName = monthNames[month];
  const daySuffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  const formatted = `Choose ${dayName}, ${monthName} ${day}${daySuffix}, ${year}`;
  const dateCell = page.locator(`.react-datepicker__day[aria-label="${formatted}"]`);
  await dateCell.waitFor({ state: 'visible', timeout: 120000 });
  await dateCell.click();
}

/**
 * Account type definitions for parameterized tests
 */
export const ACCOUNT_TYPES = {
  Individual: { accountType: 'Individual', accountNameKey: 'accountSurname' as const },
  Trust: { accountType: 'Trust', accountNameKey: 'trustAccountName' as const },
  Corporation: { accountType: 'Corporation', accountNameKey: 'corporationAccountName' as const },
  IndividualNoAdviser: {
    accountType: 'Individual',
    accountNameKey: 'accountNoAdviserSurname' as const,
  },
} as const;

export type AccountTypeKey = keyof typeof ACCOUNT_TYPES;
export type AccountTypeData = (typeof ACCOUNT_TYPES)[AccountTypeKey];

/**
 * Helper to select which account types to test
 */
export const selectAccounts = (...types: AccountTypeKey[]) => {
  return types.map((type) => ACCOUNT_TYPES[type]);
};
