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

  test.describe(`Notes Tab - ${accountType} ${suiteTag}`, () => {
    test('Add Note and Validate', async ({ app }) => {
      const seed = getSeed();
      const noteText = `Test note ${stamp()}`;

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayFormatted = `${year}-${month}-${day}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);

      await app.actions.header.openNotesTab();

      await app.pages.notes.addNoteButton().click();

      await expect(app.pages.addNoteModal.header()).toBeVisible();

      const addedNoteText = await app.actions.addNoteModal.addNote(noteText);

      await expect(app.pages.addNoteModal.header()).toBeHidden();

      const noteRow = app.pages.notes.noteRowByText(addedNoteText);
      await expect(app.pages.notes.noteContentColumn(noteRow)).toContainText(addedNoteText);

      await expect(app.pages.notes.noteCreatedColumn(noteRow)).toContainText(todayFormatted);

      await expect(app.pages.notes.noteUpdatedColumn(noteRow)).toContainText(todayFormatted);
    });

    test('Edit Note and Validate', async ({ app, page }) => {
      const seed = getSeed();
      const noteText = `Task-Update-${stamp()}`;

      await app.actions.header.searchForAccount(seed[accountNameKey]);
      await app.actions.header.openNotesTab();
      await app.pages.notes.addNoteButton().click();

      await app.actions.addNoteModal.addNote(noteText);

      try {
        await expect(page.getByText('Note has been saved', { exact: true }).first()).toBeVisible();
      } catch {
        await page.waitForLoadState('networkidle');
      }

      await app.actions.notes.expandNoteRowByName(noteText);
      await expect(app.pages.notes.expandedNoteContentTrigger()).toContainText(noteText);

      const updatedNoteText = `Task-Update-Edited-${stamp()}`;
      await app.actions.notes.updateExpandedNote(updatedNoteText);

      try {
        await expect(page.getByText('Note has been saved', { exact: true }).first()).toBeVisible();
      } catch {
        await page.waitForLoadState('networkidle');
      }

      const noteRow = app.pages.notes.noteRowByText(updatedNoteText);
      await expect(app.pages.notes.noteContentColumn(noteRow)).toContainText(updatedNoteText);
    });
  });
});
