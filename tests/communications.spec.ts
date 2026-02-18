import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const COMMUNICATION_TYPE = 'call';
const COMMUNICATION_DIRECTION = 'from client';
const COMMUNICATION_CATEGORIES = 'general query';

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  test.describe(`Communication Tab - ${accountType}`, () => {
    test('Add Communication and Validate', async ({ app, page }) => {
      const seed = getSeed();

      // Today's date in dd/mm/yyyy format (for validation)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 0);
      const day = String(dueDate.getDate()).padStart(2, '0');
      const month = String(dueDate.getMonth() + 1).padStart(2, '0');
      const year = dueDate.getFullYear();
      const dateFormatted = `${day}/${month}/${year}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openCommunicationTab();

      await app.pages.communication.addCommunicationButton().click();

      await app.actions.addCommunicationModal.addCommunication({
        type: COMMUNICATION_TYPE,
        direction: COMMUNICATION_DIRECTION,
        categories: COMMUNICATION_CATEGORIES,
        dateOffset: 0,
      });

      try {
        await expect(
          page.getByText('Communication saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      const row = app.pages.communication.communicationRowMatching(
        COMMUNICATION_TYPE,
        COMMUNICATION_DIRECTION,
        COMMUNICATION_CATEGORIES,
        dateFormatted
      );

      await expect(app.pages.communication.communicationTypeColumn(row)).toContainText(
        COMMUNICATION_TYPE
      );
      await expect(app.pages.communication.communicationDirectionColumn(row)).toContainText(
        COMMUNICATION_DIRECTION
      );
      await expect(app.pages.communication.communicationCategoriesColumn(row)).toContainText(
        COMMUNICATION_CATEGORIES
      );
      await expect(app.pages.communication.communicationDateColumn(row)).toHaveText(dateFormatted);
    });
  });
});
