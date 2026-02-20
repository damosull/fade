import { type Page } from '@playwright/test';

export class AddNoteModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: 'Add note' });
  }

  /** The "Note" / "Click to edit" trigger that opens the rich text editor */
  noteInputField() {
    return this.page.getByRole('button', { name: 'Note Click to edit Click to' });
  }

  saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }
}

export default AddNoteModalPage;
