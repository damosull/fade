import { type Locator, type Page, expect } from '@playwright/test';

const SHORT_WAIT = 5000;

export class CompliancePage {
  //variables
  readonly page: Page;
  readonly complianceHeading: Locator;
  readonly allIntroducersSearchBox: Locator;
  readonly introducerSelect: Locator;
  readonly addIntroducerButton: Locator;
  readonly allReferralhHeading: Locator;
  readonly allReferralSelect: Locator;
  readonly addReferralCompanyButton: Locator;
  readonly addIntroducerHeading: Locator;
  readonly addIntroducerName: Locator;
  readonly addContactName: Locator;
  readonly addIntroducerEmail: Locator;
  readonly addIntroducerPhone: Locator;
  readonly addIntroducerSourceDropdown: Locator;
  readonly addIntroducerSourceSelect: Locator;
  readonly addIntroducerStatusDropdwon: Locator;
  readonly addIntroducerStatusSelect: Locator;
  readonly addAdviserDropdown: Locator;
  readonly addAdviserSelect: Locator;
  readonly bankDetailsHeading: Locator;
  readonly bankAccountName: Locator;
  readonly bankAccountNumber: Locator;
  readonly bankSortCode: Locator;
  readonly feeSplitPercentage: Locator;
  readonly feeSplitTypeDropdown: Locator;
  readonly feeSplitType: Locator;
  readonly adviserGrossNetDropdown: Locator;
  readonly adviserGrossNetSelect: Locator;
  readonly addFeeSplitButton: Locator;
  readonly addIntroducerSaveButton: Locator;
  readonly fromDate: Locator;
  readonly fromDatePicker: Locator;
  readonly introducerStatusDate: Locator;
  readonly introducerStatusDatePicker: Locator;

  constructor(page: Page) {
    this.page = page;
    //ALl introducers
    this.complianceHeading = page.getByRole('heading', {
      name: 'Professional Introducers',
      exact: true,
    });
    this.allIntroducersSearchBox = page
      .getByRole('main')
      .getByRole('searchbox', { name: 'Search' });
    this.introducerSelect = page.getByRole('link', { name: 'Select Introducer' });
    this.addIntroducerButton = page.getByRole('button', { name: 'Add Introducer' });
    //All Referral Companies
    this.allReferralhHeading = page.getByRole('heading', { name: 'All Referral Companies' });
    this.allReferralSelect = page.getByRole('link', { name: 'Select Referral Company' });
    this.addReferralCompanyButton = page.getByRole('button', { name: 'Add Referral Company' });
    //Add introducer pop up modal
    this.addIntroducerHeading = page.getByRole('heading', { name: 'Add Introducer' });
    this.addIntroducerName = page.getByRole('textbox', { name: 'Introducer Name' });
    this.addContactName = page.getByRole('textbox', { name: 'Contact Name' });
    this.addIntroducerEmail = page.getByRole('textbox', { name: 'Email Address' });
    this.addIntroducerPhone = page.getByRole('textbox', { name: 'Phone number' });
    this.addIntroducerSourceDropdown = page
      .locator('label')
      .filter({ hasText: 'Introducer SourceSelect...' })
      .locator('svg');
    this.addIntroducerSourceSelect = page.getByRole('option', { name: 'Adviser' });
    this.addIntroducerStatusDropdwon = page
      .locator('label')
      .filter({ hasText: 'Introducer StatusSelect...' })
      .locator('svg');
    this.addIntroducerStatusSelect = page.getByRole('option', { name: 'approved' });
    this.addAdviserDropdown = page
      .locator('label')
      .filter({ hasText: 'AdviserSelect...' })
      .locator('svg');
    this.addAdviserSelect = page.getByRole('option', { name: 'Abigail Thompson' });
    this.feeSplitTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Fee Type' })
      .locator('svg');
    this.feeSplitType = page.getByRole('option', { name: 'initial advice fee' });
    this.adviserGrossNetDropdown = page
      .locator('label')
      .filter({ hasText: 'Adviser paid gross or net of' })
      .locator('svg')
      .nth(1);
    this.adviserGrossNetSelect = page.getByRole('option', { name: 'net' });
    this.feeSplitPercentage = page.getByRole('textbox', { name: 'Split %' });
    this.addFeeSplitButton = page.getByRole('button', { name: 'Add', exact: true });
    this.addIntroducerSaveButton = page.getByRole('button', { name: 'Add Introducer' });
    this.bankDetailsHeading = page.getByText('Bank Details');
    this.bankAccountName = page.getByRole('textbox', { name: 'Account Name' });
    this.bankAccountNumber = page.getByRole('textbox', { name: 'Account Number' });
    this.bankSortCode = page.getByRole('textbox', { name: 'Sort Code' });
    this.fromDate = page
      .locator('div')
      .filter({ hasText: /^From Date$/ })
      .locator('svg');
    this.fromDatePicker = page.locator('.react-datepicker__day--today');
    this.introducerStatusDate = page
      .locator('div')
      .filter({ hasText: /^Introducer Status Date$/ })
      .locator('svg');
    this.introducerStatusDatePicker = page.locator('.react-datepicker__day--today');
  }

  //methods

  async compliancePageHeading() {
    await expect(this.complianceHeading).toBeVisible({ timeout: SHORT_WAIT });
  }

  async clickAddIntroducerButton() {
    await this.addIntroducerButton.click();
  }

  async addIntroducer(
    addIntroducerName: string,
    addIntroducerEmail: string,
    addIntroducerPhone: string
  ) {
    await expect(this.addIntroducerHeading).toBeVisible({ timeout: SHORT_WAIT });
    await this.addIntroducerName.fill(addIntroducerName);
    await this.addIntroducerEmail.fill(addIntroducerEmail);
    await this.addIntroducerPhone.fill(addIntroducerPhone);
  }

  async addIntroducerSource(addIntroducerSourceSelect: string, addIntroducerStatusSelect: string) {
    await this.addIntroducerSourceDropdown.click();
    const option = this.page.getByRole('option', { name: addIntroducerSourceSelect });
    await option.waitFor({ state: 'visible', timeout: 60_000 });
    await option.click({ timeout: 60_000 });
    await this.addIntroducerStatusDropdwon.click();
    await this.page.getByRole('option', { name: addIntroducerStatusSelect }).click();
    await this.introducerStatusDate.click();
    await this.introducerStatusDatePicker.click();
  }

  async addAdviser(addAdviserSelect: string) {
    await expect(this.addAdviserDropdown).toBeVisible({ timeout: SHORT_WAIT });
    await this.addAdviserDropdown.click();
    await expect(this.page.getByRole('option', { name: addAdviserSelect })).toBeVisible({
      timeout: 60_000,
    });
    await this.page.getByRole('option', { name: addAdviserSelect }).click();
  }

  async addIntroducerBankDetails(
    bankAccountName: string,
    bankAccountNumber: string,
    bankSortCode: string
  ) {
    await expect(this.bankDetailsHeading).toBeVisible({ timeout: SHORT_WAIT });
    await this.bankAccountName.fill(bankAccountName);
    await this.bankAccountNumber.fill(bankAccountNumber);
    await this.bankSortCode.fill(bankSortCode);
  }

  async addIntroducerFeeSplit(
    feeSplitPercentage: string,
    feeSplitType: string,
    adviserGrossNetSelect: string
  ) {
    await this.feeSplitPercentage.fill(feeSplitPercentage);
    await this.feeSplitTypeDropdown.click();
    await this.page.getByRole('option', { name: feeSplitType }).click();
    await this.adviserGrossNetDropdown.click();
    await this.page.getByRole('option', { name: adviserGrossNetSelect }).click();
    await this.addFeeSplitButton.click();
  }
}

export default CompliancePage;
