import { type Page } from '@playwright/test';

export class AddCommunicationModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modal() {
    return this.page.locator('div[role="dialog"]');
  }

  addCommunicationHeading() {
    return this.modal().getByRole('heading', { name: 'Add Communication' });
  }

  typeDropdown() {
    return this.modal().getByRole('combobox').nth(0);
  }

  directionDropdown() {
    return this.modal().getByRole('combobox').nth(1);
  }

  /** Summary section: Categories dropdown. */
  categoriesDropdown() {
    return this.modal().getByRole('combobox').nth(2);
  }

  /** Summary section: Date picker trigger (opens react-datepicker). */
  dateDropdown() {
    return this.modal().locator('.react-datepicker__calendar-icon').first();
  }

  /** Attendees section: Type dropdown (visible when adding an attendee). */
  attendeeTypeDropdown() {
    return this.modal().getByRole('combobox').nth(3);
  }

  /** Attendees section: System User dropdown (visible after selecting "system user" in Type; 5th combobox in modal). */
  systemUserDropdown() {
    return this.modal().getByRole('combobox').nth(4);
  }

  addAttendeeButton() {
    return this.modal().getByRole('button', { name: 'Add attendee' });
  }

  saveButton() {
    return this.modal().getByRole('button', { name: 'Save' });
  }
}

export default AddCommunicationModalPage;
