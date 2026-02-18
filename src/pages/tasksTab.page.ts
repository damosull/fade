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

  /** Container for the expanded inline task edit form (after clicking Type cell). Scoped to Tasks table. */
  expandedTaskForm() {
    return this.tasksTable().getByRole('group', { name: 'New Task' });
  }

  expandedTaskNameInput() {
    return this.expandedTaskForm().getByRole('textbox', { name: 'Name' });
  }

  expandedTaskTypeDropdown() {
    return this.expandedTaskForm()
      .locator('label')
      .filter({ hasText: 'Type' })
      .locator('[role="combobox"]');
  }

  expandedTaskDueDateDropdown() {
    return this.expandedTaskForm()
      .locator('div')
      .filter({ hasText: /^Due Date/ })
      .locator('svg, img')
      .first();
  }

  expandedTaskAssignToDropdown() {
    return this.expandedTaskForm()
      .locator('label')
      .filter({ hasText: 'Assign to' })
      .locator('[role="combobox"]');
  }

  /** Save is outside the "New Task" fieldset; scope to the form in the expanded row. */
  expandedTaskSaveButton() {
    return this.tasksTable().locator('form').getByRole('button', { name: 'Save' });
  }
}

export default TasksTabPage;
