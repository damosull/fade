import { expect, type Page } from '@playwright/test';
import TasksTabPage from '../pages/tasksTab.page';

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
}

export default TasksTabActions;
