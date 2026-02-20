import { expect, type Page } from '@playwright/test';
import CommunicationTabPage from '../pages/communicationTab.page';
import { selectDateByOffset, selectFromDropdown } from '../support/helpers';

export class CommunicationTabActions {
  private readonly page: Page;
  private readonly view: CommunicationTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new CommunicationTabPage(page);
  }

  async expandCommunicationRow(
    type: string,
    direction: string,
    categories: string,
    dateFormatted: string
  ): Promise<void> {
    const row = this.view.communicationRowMatching(type, direction, categories, dateFormatted);
    await expect(row).toBeVisible();
    await row.scrollIntoViewIfNeeded();
    await this.view.communicationTypeColumn(row).click();
  }

  async updateExpandedCommunication(options: {
    type?: string;
    direction?: string;
    categories?: string;
    dateOffset?: number;
  }): Promise<void> {
    await expect(this.view.expandedCommunicationForm()).toBeVisible({ timeout: 5000 });

    if (options.type) {
      await selectFromDropdown(this.page, this.view.expandedTypeDropdown(), options.type);
    }

    if (options.direction) {
      await selectFromDropdown(this.page, this.view.expandedDirectionDropdown(), options.direction);
    }

    if (options.categories) {
      await selectFromDropdown(
        this.page,
        this.view.expandedCategoriesDropdown(),
        options.categories
      );
    }

    if (options.dateOffset !== undefined) {
      await selectDateByOffset(this.page, this.view.expandedDateDropdown(), options.dateOffset);
    }
  }

  async addAttendeeToExpandedCommunication(
    attendeeType: string,
    systemUser: string
  ): Promise<void> {
    await expect(this.view.expandedCommunicationForm()).toBeVisible({ timeout: 5000 });

    await selectFromDropdown(this.page, this.view.expandedAttendeeTypeDropdown(), attendeeType);
    await selectFromDropdown(this.page, this.view.expandedSystemUserDropdown(), systemUser);
    await this.view.expandedAddAttendeeButton().click();

    // Validate attendee was added to the table
    const attendeeRows = this.view.expandedAttendeesTableRows();
    await expect(attendeeRows.filter({ hasText: systemUser })).toBeVisible();
  }

  async saveExpandedCommunication(): Promise<void> {
    await this.view.expandedSaveButton().click();
  }

  async deleteCommunicationRow(
    type: string,
    direction: string,
    categories: string,
    dateFormatted: string
  ): Promise<void> {
    const row = this.view.communicationRowMatching(type, direction, categories, dateFormatted);
    await expect(row).toBeVisible();
    await row.scrollIntoViewIfNeeded();
    await this.view.communicationRowDeleteButton(row).click();
  }
}

export default CommunicationTabActions;
