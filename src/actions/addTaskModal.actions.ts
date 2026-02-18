import { expect, type Page } from '@playwright/test';
import AddTaskModalPage from '../pages/addTaskModal.page';
import { selectDateByOffset, selectFromDropdown } from '../support/helpers';

export class AddTaskModalActions {
  private readonly page: Page;
  private readonly view: AddTaskModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddTaskModalPage(page);
  }

  async addTask(name: string, type: string, daysOffset: number, assignTo: string): Promise<void> {
    await expect(this.view.addTaskHeading()).toBeVisible({ timeout: 5000 });

    await this.view.nameInput().fill(name);

    await selectFromDropdown(this.page, this.view.typeDropdown(), type);
    await selectDateByOffset(this.page, this.view.dueDateDropdown(), daysOffset);
    await selectFromDropdown(this.page, this.view.assignToDropdown(), assignTo);

    await this.view.taskActionDescriptionInput().fill('Test action');
    await this.view.addActionButton().click();

    await this.view.addButton().click();
  }
}

export default AddTaskModalActions;
