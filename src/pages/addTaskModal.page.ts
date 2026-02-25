import { type Page } from '@playwright/test';

export class AddTaskModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modal() {
    return this.page.locator('div').filter({
      has: this.page.getByRole('heading', { name: 'Add Task' }),
    });
  }

  addTaskHeading() {
    return this.page.getByRole('heading', { name: 'Add Task' });
  }

  nameInput() {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  typeDropdown() {
    return this.modal().locator('label').filter({ hasText: 'Type' }).locator('[role="combobox"]');
  }

  dueDateDropdown() {
    return this.modal()
      .locator('div')
      .filter({ hasText: /^Due Date$/ })
      .locator('svg');
  }

  assignToDropdown() {
    return this.modal()
      .locator('label')
      .filter({ hasText: 'Assign to' })
      .locator('[role="combobox"]');
  }

  taskActionDescriptionInput() {
    return this.modal().locator('input[name="description"]');
  }

  addActionButton() {
    return this.modal().getByRole('button', { name: 'Add Action' });
  }

  addButton() {
    return this.modal().getByRole('button', { name: 'Add' }).last();
  }
}

export default AddTaskModalPage;
