import { type Page } from '@playwright/test';

export class AddDocumentModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  modal() {
    return this.page.locator('div[role="dialog"]');
  }

  header() {
    return this.page.getByRole('heading', { name: 'Add Document' });
  }

  typeDropdown() {
    return this.modal().getByRole('combobox').nth(0);
  }

  subTypeDropdown() {
    return this.modal().getByRole('combobox').nth(1);
  }

  documentURLInput() {
    return this.page.locator('[name="url"]');
  }

  documentDescriptionInput() {
    return this.page.locator('[name="description"]');
  }

  saveButton() {
    return this.modal().getByRole('button', { name: 'Save' });
  }
}

export default AddDocumentModalPage;
