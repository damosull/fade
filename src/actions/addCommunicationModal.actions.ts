import { expect, type Page } from '@playwright/test';
import AddCommunicationModalPage from '../pages/addCommunicationModal.page';
import { selectDateByOffset, selectFromDropdown } from '../support/helpers';

export class AddCommunicationModalActions {
  private readonly page: Page;
  private readonly view: AddCommunicationModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddCommunicationModalPage(page);
  }

  /**
   * Fills Summary (Type, Direction, Categories, Date) and Attendees (Type = system user,
   * System User = Test Superadmin, Add Attendee), then clicks Save.
   */
  async addCommunication(options: {
    type: string;
    direction: string;
    categories: string;
    dateOffset?: number;
  }): Promise<void> {
    await expect(this.view.addCommunicationHeading()).toBeVisible({ timeout: 5000 });

    const dateOffset = options.dateOffset ?? 0;

    // Summary
    await selectFromDropdown(this.page, this.view.typeDropdown(), options.type);
    await selectFromDropdown(this.page, this.view.directionDropdown(), options.direction);
    await selectFromDropdown(this.page, this.view.categoriesDropdown(), options.categories);
    await selectDateByOffset(this.page, this.view.dateDropdown(), dateOffset);

    // Attendees: Type = system user, then System User = Test Superadmin, then Add Attendee
    await selectFromDropdown(this.page, this.view.attendeeTypeDropdown(), 'system user');
    await selectFromDropdown(this.page, this.view.systemUserDropdown(), 'Test Superadmin');
    await this.view.addAttendeeButton().click();

    await this.view.saveButton().click();
  }
}

export default AddCommunicationModalActions;
