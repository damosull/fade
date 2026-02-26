import { expect, type Page } from '@playwright/test';
// import { selectDateByOffset, selectFromDropdown } from '../support/helpers';
import { NotesTabPage } from '../pages/index.page';

export class NotesTabActions {
  private readonly page: Page;
  private readonly view: NotesTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new NotesTabPage(page);
  }

  async expandNotesIfMoreThanFive(): Promise<void> {
    const rows = this.view.notesRows();

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.notesViewMoreButton().click();
      await expect(this.view.notesViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.notesViewMoreButton()).toHaveCount(0);
    }
  }

  async expandNoteRowByName(name: string): Promise<void> {
    await this.expandNotesIfMoreThanFive();
    const row = this.view.noteRowByName(name);
    await this.view.noteContentColumn(row).click();
  }

  async updateExpandedNote(newNoteText: string, important?: boolean): Promise<void> {
    await expect(this.view.expandedNoteSaveButton()).toBeVisible({ timeout: 5000 });
    await this.view.expandedNoteContentTrigger().click();
    const selectAllShortcut = process.platform === 'darwin' ? 'Meta+a' : 'Control+a';
    await this.page.keyboard.press(selectAllShortcut);
    await this.page.keyboard.type(newNoteText);
    if (important !== undefined) {
      if (important) {
        await this.view.expandedNoteImportantCheckbox().check();
      } else {
        await this.view.expandedNoteImportantCheckbox().uncheck();
      }
    }
    await this.view.expandedNoteSaveButton().click();
  }
}

export default NotesTabActions;
