import { type Page } from '@playwright/test';

export class AddEmploymentModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modal() {
    return this.page.locator('div[role="dialog"]');
  }

  addEmploymentHeading() {
    return this.modal().getByRole('heading', { name: 'Add Employment' });
  }

  employerName() {
    return this.modal().getByRole('textbox', { name: 'Employer', exact: true });
  }

  jobTitle() {
    return this.modal().getByRole('textbox', { name: 'Job Title', exact: true });
  }

  employmentStatusDropdown() {
    return this.modal().locator('label').filter({ hasText: 'Employment Status' }).locator('svg');
  }

  typeOfEmploymentDropdown() {
    return this.modal().locator('label').filter({ hasText: 'Type of employment' }).locator('svg');
  }

  addEmploymentAddButton() {
    return this.modal().getByRole('button', { name: 'Add' }).last();
  }
}

export default AddEmploymentModalPage;
