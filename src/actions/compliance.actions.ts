import { type Page, expect } from '@playwright/test';
import CompliancePage from '../pages/compliance.page';
import { chooseDropdownOption } from '../support/helpers';

export class ComplianceActions {
  private readonly page: Page;
  private readonly view: CompliancePage;

  constructor(page: Page) {
    this.page = page;
    this.view = new CompliancePage(page);
  }

  async compliancePageHeading(): Promise<void> {
    await expect(this.view.complianceHeading()).toBeVisible();
  }

  async clickAddIntroducerButton(): Promise<void> {
    await this.view.addIntroducerButton().click();
  }

  async addIntroducer(name: string, email: string, phone: string): Promise<void> {
    await expect(this.view.addIntroducerHeading()).toBeVisible();
    await this.view.addIntroducerName().fill(name);
    await this.view.addIntroducerEmail().fill(email);
    await this.view.addIntroducerPhone().fill(phone);
  }

  async addIntroducerSource(sourceOption: string, statusOption: string): Promise<void> {
    await this.view.addIntroducerSourceDropdown().click();
    await chooseDropdownOption(this.page, sourceOption);

    await this.view.addIntroducerStatusDropdown().click();
    await chooseDropdownOption(this.page, statusOption);

    await this.view.introducerStatusDate().click();
    await this.view.introducerStatusDatePickerToday().click();
  }

  async addAdviser(adviserName: string): Promise<void> {
    await expect(this.view.addAdviserDropdown()).toBeVisible();
    await this.view.addAdviserDropdown().click();
    await chooseDropdownOption(this.page, adviserName);
  }

  async addIntroducerBankDetails(
    accountName: string,
    accountNumber: string,
    sortCode: string
  ): Promise<void> {
    await expect(this.view.bankDetailsHeading()).toBeVisible();
    await this.view.bankAccountName().fill(accountName);
    await this.view.bankAccountNumber().fill(accountNumber);
    await this.view.bankSortCode().fill(sortCode);
  }

  async addIntroducerFeeSplit(
    percentage: string,
    feeType: string,
    grossNetOption: string
  ): Promise<void> {
    await this.view.feeSplitPercentage().fill(percentage);

    await this.view.feeSplitTypeDropdown().click();
    await chooseDropdownOption(this.page, feeType);

    await this.view.adviserGrossNetDropdown().click();
    await chooseDropdownOption(this.page, grossNetOption);

    await this.view.addFeeSplitButton().click();
  }
}

export default ComplianceActions;
