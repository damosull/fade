import { expect, type Page } from '@playwright/test';
import { AddDocumentModalPage } from '../pages/addDocumentModalPage.page';
import { selectFromDropdown } from '../support/helpers';

export class AddDocumentModalActions {
  private readonly page: Page;
  private readonly view: AddDocumentModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddDocumentModalPage(page);
  }

  async addDocument(options: {
    type: string;
    subtype: string;
    url: string;
    description: string;
  }): Promise<void> {
    await expect(this.view.header()).toBeVisible({ timeout: 5000 });
    await selectFromDropdown(this.page, this.view.typeDropdown(), options.type);
    await selectFromDropdown(this.page, this.view.subTypeDropdown(), options.subtype);
    await this.view.documentURLInput().fill(options.url);
    await this.view.documentDescriptionInput().fill(options.description);
    await this.view.documentDescriptionInput().press('Tab');
    await this.view.saveButton().click();
  }
}

export default AddDocumentModalActions;
