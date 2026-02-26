import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const COMMUNICATION_TYPE = 'call';
const COMMUNICATION_DIRECTION = 'from client';
const COMMUNICATION_CATEGORIES = 'general query';
const UPDATED_COMMUNICATION_TYPE = 'email';
const UPDATED_COMMUNICATION_DIRECTION = 'to client';

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  const suiteTag = `@${accountType.toLowerCase()}`;
  test.describe(`Communication Tab - ${accountType} ${suiteTag}`, () => {
    test('Add Communication and Validate', async ({ app, page }) => {
      const seed = getSeed();

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

    test('Update Communication and Validate', async ({ app, page }) => {
      const seed = getSeed();
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

      await app.actions.communication.expandCommunicationRow(
        COMMUNICATION_TYPE,
        COMMUNICATION_DIRECTION,
        COMMUNICATION_CATEGORIES,
        dateFormatted
      );
      await app.actions.communication.updateExpandedCommunication({
        type: UPDATED_COMMUNICATION_TYPE,
        direction: UPDATED_COMMUNICATION_DIRECTION,
      });
      await app.actions.communication.addAttendeeToExpandedCommunication(
        'system user',
        'Test Administrator All Clients'
      );
      await app.actions.communication.saveExpandedCommunication();

      try {
        await expect(
          page.getByText('Communication saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      const updatedRow = app.pages.communication.communicationRowMatching(
        UPDATED_COMMUNICATION_TYPE,
        UPDATED_COMMUNICATION_DIRECTION,
        COMMUNICATION_CATEGORIES,
        dateFormatted
      );

      await expect(app.pages.communication.communicationTypeColumn(updatedRow)).toContainText(
        UPDATED_COMMUNICATION_TYPE
      );
      await expect(app.pages.communication.communicationDirectionColumn(updatedRow)).toContainText(
        UPDATED_COMMUNICATION_DIRECTION
      );
      await expect(app.pages.communication.communicationCategoriesColumn(updatedRow)).toContainText(
        COMMUNICATION_CATEGORIES
      );
      await expect(app.pages.communication.communicationDateColumn(updatedRow)).toHaveText(
        dateFormatted
      );
    });

    test('Delete Communication and Validate', async ({ app, page }) => {
      const seed = getSeed();

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

      await expect(
        app.pages.communication.communicationRowMatching(
          COMMUNICATION_TYPE,
          COMMUNICATION_DIRECTION,
          COMMUNICATION_CATEGORIES,
          dateFormatted
        )
      ).toBeVisible();

      const countBefore = await app.pages.communication.communicationDataRows().count();

      await app.actions.communication.deleteCommunicationRow(
        COMMUNICATION_TYPE,
        COMMUNICATION_DIRECTION,
        COMMUNICATION_CATEGORIES,
        dateFormatted
      );

      await expect(app.pages.communication.communicationDataRows()).toHaveCount(countBefore - 1);
    });
  });
});
