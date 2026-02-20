import { type Locator, type Page } from '@playwright/test';

export class NotesTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  notesHeading() {
    return this.page.getByRole('heading', { name: 'Notes' });
  }

  addNoteButton() {
    return this.page.getByRole('button', { name: 'Add Note' });
  }

  notesTable() {
    return this.page.locator('fieldset').filter({ hasText: 'Notes' }).locator('table');
  }

  notesRows() {
    return this.notesTable().locator('tbody tr');
  }

  noteRowByText(noteText: string) {
    return this.page.locator('table tbody tr').filter({ hasText: noteText });
  }

  noteContentColumn(row: Locator) {
    return row.locator('td').nth(1);
  }

  noteCreatedColumn(row: Locator) {
    return row.locator('td').nth(2);
  }

  noteUpdatedColumn(row: Locator) {
    return row.locator('td').nth(3);
  }

  // below will probably be used for 'Delete' action later on
  noteActionsColumn(row: Locator) {
    return row.locator('td').nth(5);
  }
}

export default NotesTabPage;
