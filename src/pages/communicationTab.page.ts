import { type Locator, type Page } from '@playwright/test';

export class CommunicationTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addCommunicationButton() {
    return this.page.getByRole('button', { name: 'Add Communication' });
  }

  communicationsTable() {
    return this.page
      .locator('h2')
      .filter({ hasText: 'Communication' })
      .locator('..')
      .locator('table');
  }

  communicationRowMatching(
    type: string,
    direction: string,
    categories: string,
    dateFormatted: string
  ) {
    return this.communicationsTable()
      .locator('tbody tr')
      .filter({ hasText: type })
      .filter({ hasText: direction })
      .filter({ hasText: categories })
      .filter({ hasText: dateFormatted })
      .first();
  }

  communicationTypeColumn(row: Locator) {
    return row.locator('td').nth(0);
  }

  communicationDirectionColumn(row: Locator) {
    return row.locator('td').nth(1);
  }

  communicationCategoriesColumn(row: Locator) {
    return row.locator('td').nth(2);
  }

  communicationDateColumn(row: Locator) {
    return row.locator('td').nth(3);
  }

  communicationRowDeleteButton(row: Locator) {
    return row.locator('td').last().locator('button');
  }

  communicationDataRows() {
    return this.communicationsTable().locator('tbody tr:has(td:last-of-type button)');
  }

  /** Container for the expanded inline communication edit form (after clicking Type cell). Scoped to Communications table. */
  expandedCommunicationForm() {
    return this.communicationsTable().locator('form');
  }

  expandedTypeDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Summary' })
      .locator('label')
      .filter({ hasText: 'Type' })
      .locator('[role="combobox"]');
  }

  expandedDirectionDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Summary' })
      .locator('label')
      .filter({ hasText: 'Direction' })
      .locator('[role="combobox"]');
  }

  expandedCategoriesDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Summary' })
      .locator('label')
      .filter({ hasText: 'Categories' })
      .locator('[role="combobox"]');
  }

  expandedDateDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Summary' })
      .locator('.react-datepicker__calendar-icon')
      .first();
  }

  expandedAttendeeTypeDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Attendees' })
      .locator('.grid')
      .locator('label')
      .filter({ hasText: 'Type' })
      .locator('[role="combobox"]');
  }

  expandedSystemUserDropdown() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Attendees' })
      .locator('.grid')
      .locator('[role="combobox"]')
      .nth(1);
  }

  expandedAddAttendeeButton() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Attendees' })
      .getByRole('button', { name: 'Add attendee' });
  }

  expandedAttendeesTable() {
    return this.expandedCommunicationForm()
      .locator('fieldset')
      .filter({ hasText: 'Attendees' })
      .locator('table');
  }

  expandedAttendeesTableRows() {
    return this.expandedAttendeesTable().locator('tbody tr');
  }

  expandedSaveButton() {
    return this.expandedCommunicationForm().getByRole('button', { name: 'Save' });
  }
}

export default CommunicationTabPage;
