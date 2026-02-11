import { expect, type Page } from '@playwright/test';
import AddEmploymentModalPage from '../pages/addEmploymentModal.page';
import { selectFromDropdown } from '../support/helpers';

export class AddEmploymentModalActions {
  private readonly page: Page;
  private readonly view: AddEmploymentModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddEmploymentModalPage(page);
  }

  async addEmploymentDetails(
    employerName: string,
    jobTitle: string,
    employmentStatus: string,
    typeOfEmployment: string
  ) {
    await expect(this.view.addEmploymentHeading()).toBeVisible({ timeout: 5000 });

    await this.view.employerName().fill(employerName);
    await this.view.jobTitle().fill(jobTitle);

    await selectFromDropdown(this.page, this.view.employmentStatusDropdown(), employmentStatus);
    await selectFromDropdown(this.page, this.view.typeOfEmploymentDropdown(), typeOfEmployment);

    await this.view.addEmploymentAddButton().click();
  }
}

export default AddEmploymentModalActions;
