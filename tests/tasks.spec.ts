import { expect, test } from '../src/fixtures/baseTest';
import { navigateToHome } from '../src/seed/auth';
import { getSeed } from '../src/seed/seedClient';
import { selectAccounts } from '../src/support/helpers';

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

test.beforeEach(async ({ page }, testInfo) => {
  await navigateToHome(page, process.env.CI ? testInfo.project.name : 'chromium');
});

selectAccounts('Individual', 'Trust', 'Corporation').forEach(({ accountType, accountNameKey }) => {
  const suiteTag = `@${accountType.toLowerCase()}`;
  test.describe(`Tasks Tab - ${accountType} ${suiteTag}`, () => {
    test('Add Task and Validate', async ({ app, page }) => {
      const seed = getSeed();
      const taskName = `Task-${stamp()}`;
      const DAYS_OFFSET = 7;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + DAYS_OFFSET);
      const day = String(dueDate.getDate()).padStart(2, '0');
      const month = String(dueDate.getMonth() + 1).padStart(2, '0');
      const year = dueDate.getFullYear();
      const dueDateFormatted = `${day}/${month}/${year}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);
      await app.actions.header.openTaskTab();
      await app.pages.tasks.addTaskButton().click();
      await app.actions.addTaskModal.addTask(
        taskName,
        'new enquiry',
        DAYS_OFFSET,
        'Test Administrator All Clients'
      );

      try {
        await expect(
          page.getByText('Task saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        console.warn('[seed-ui] ⚠️ Success message not found, falling back to networkidle');
        await page.waitForLoadState('networkidle');
      }

      await app.actions.tasks.expandTasksIfMoreThanFive();

      const taskRow = app.pages.tasks.taskRowByName(taskName);

      await expect(app.pages.tasks.taskNameColumn(taskRow)).toHaveText(taskName);
      await expect(app.pages.tasks.taskTypeColumn(taskRow)).toContainText('new enquiry');
      await expect(app.pages.tasks.taskAssignedToColumn(taskRow)).toContainText(
        'Test Administrator All Clients'
      );
      await expect(app.pages.tasks.taskStatusColumn(taskRow)).toContainText('not started');
      await expect(app.pages.tasks.taskDueDateColumn(taskRow)).toHaveText(dueDateFormatted);
    });

    test('Update Task', async ({ app, page }) => {
      const seed = getSeed();
      const taskName = `Task-Update-${stamp()}`;
      const DAYS_OFFSET = 7;
      const DAYS_OFFSET_EDIT = 14;
      const assignTo = 'Test Administrator All Clients';

      await app.actions.header.searchForAccount(seed[accountNameKey]);
      await app.actions.header.openTaskTab();
      await app.pages.tasks.addTaskButton().click();
      await app.actions.addTaskModal.addTask(taskName, 'new enquiry', DAYS_OFFSET, assignTo);

      try {
        await expect(
          page.getByText('Task saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        await page.waitForLoadState('networkidle');
      }

      await app.actions.tasks.expandTaskRowByName(taskName);
      await expect(page.getByRole('textbox', { name: 'Name' }).first()).toHaveValue(taskName);

      const updatedName = `Task-Update-Edited-${stamp()}`;
      const updatedType = 'new enquiry';
      const dueDateEdit = new Date();
      dueDateEdit.setDate(dueDateEdit.getDate() + DAYS_OFFSET_EDIT);
      const dueDateFormatted = `${String(dueDateEdit.getDate()).padStart(2, '0')}/${String(dueDateEdit.getMonth() + 1).padStart(2, '0')}/${dueDateEdit.getFullYear()}`;

      await app.actions.tasks.updateExpandedTask(
        updatedName,
        updatedType,
        DAYS_OFFSET_EDIT,
        assignTo
      );

      try {
        await expect(
          page.getByText('Task saved successfully', { exact: true }).first()
        ).toBeVisible();
      } catch {
        await page.waitForLoadState('networkidle');
      }

      const taskRow = app.pages.tasks.taskRowByName(updatedName);

      await expect(app.pages.tasks.taskNameColumn(taskRow)).toHaveText(updatedName);
      await expect(app.pages.tasks.taskTypeColumn(taskRow)).toContainText(updatedType);
      await expect(app.pages.tasks.taskAssignedToColumn(taskRow)).toContainText(assignTo);
      await expect(app.pages.tasks.taskStatusColumn(taskRow)).toContainText('not started');
      await expect(app.pages.tasks.taskDueDateColumn(taskRow)).toHaveText(dueDateFormatted);
    });
  });
});
