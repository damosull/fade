import { type Locator, type Page } from '@playwright/test';

export class TasksTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addTaskButton() {
    return this.page.getByRole('button', { name: 'Add Task' });
  }

  tasksTable() {
    return this.page.locator('h2').filter({ hasText: 'Tasks' }).locator('..').locator('table');
  }

  tasksRows() {
    return this.tasksTable().locator('tbody tr');
  }

  tasksViewMoreButton() {
    return this.tasksTable().getByRole('button', { name: 'View more' });
  }

  tasksViewLessButton() {
    return this.tasksTable().getByRole('button', { name: 'View less' });
  }

  taskRowByName(name: string) {
    return this.page.locator('table tbody tr').filter({ hasText: name });
  }

  taskTypeColumn(row: Locator) {
    return row.locator('td').nth(0);
  }

  taskNameColumn(row: Locator) {
    return row.locator('td').nth(1);
  }

  taskAssignedToColumn(row: Locator) {
    return row.locator('td').nth(2);
  }

  taskStatusColumn(row: Locator) {
    return row.locator('td').nth(3);
  }

  taskDueDateColumn(row: Locator) {
    return row.locator('td').nth(4);
  }

  taskReferenceColumn(row: Locator) {
    return row.locator('td').nth(6);
  }
}

export default TasksTabPage;
