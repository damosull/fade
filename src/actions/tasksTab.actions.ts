import { expect, type Page } from '@playwright/test';
import TasksTabPage from '../pages/tasksTab.page';
import { selectDateByOffset, selectFromDropdown } from '../support/helpers';

export class TasksTabActions {
  private readonly page: Page;
  private readonly view: TasksTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new TasksTabPage(page);
  }

  async expandTasksIfMoreThanFive(): Promise<void> {
    const rows = this.view.tasksRows();

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.tasksViewMoreButton().click();
      await expect(this.view.tasksViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.tasksViewMoreButton()).toHaveCount(0);
    }
  }

  async expandTaskRowByName(name: string): Promise<void> {
    await this.expandTasksIfMoreThanFive();
    const row = this.view.taskRowByName(name);
    await this.view.taskTypeColumn(row).click();
  }

  async updateExpandedTask(
    newName: string,
    newType: string,
    daysOffset: number,
    assignTo: string
  ): Promise<void> {
    await expect(this.view.expandedTaskNameInput()).toBeVisible({ timeout: 5000 });
    await this.view.expandedTaskNameInput().fill(newName);
    await selectFromDropdown(this.page, this.view.expandedTaskTypeDropdown(), newType);
    await selectDateByOffset(this.page, this.view.expandedTaskDueDateDropdown(), daysOffset);
    await selectFromDropdown(this.page, this.view.expandedTaskAssignToDropdown(), assignTo);
    await this.view.expandedTaskSaveButton().click();
  }
}

export default TasksTabActions;
