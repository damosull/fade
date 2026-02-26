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

  notesViewMoreButton() {
    return this.notesTable().getByRole('button', { name: 'View more' });
  }

  notesViewLessButton() {
    return this.notesTable().getByRole('button', { name: 'View less' });
  }

  noteRowByName(name: string) {
    return this.notesTable().locator('tbody tr').filter({ hasText: name });
  }

  noteTypeColumn(row: Locator) {
    return row.locator('td').nth(0);
  }

  noteRowByText(noteText: string) {
    return this.notesTable().locator('tbody tr').filter({ hasText: noteText });
  }

  /** Expanded note row (the table row that contains Save and the note editor). */
  expandedNoteRow() {
    return this.notesTable()
      .locator('tr')
      .filter({ has: this.page.getByRole('button', { name: 'Save' }) });
  }

  /** The "Note / Click to edit" button in the expanded row. */
  expandedNoteContentTrigger() {
    return this.expandedNoteRow().getByRole('button', { name: /Note Click to edit/ });
  }

  expandedNoteImportantCheckbox() {
    return this.expandedNoteRow().getByRole('checkbox', { name: 'Important' });
  }

  expandedNoteSaveButton() {
    return this.notesTable().getByRole('button', { name: 'Save' });
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
