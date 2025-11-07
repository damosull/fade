import { type Page } from '@playwright/test';

export class CompliancePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  complianceHeading() {
    return this.page.getByRole('heading', { name: 'Professional Introducers', exact: true });
  }

  allIntroducersSearchBox() {
    return this.page.getByRole('main').getByRole('searchbox', { name: 'Search' });
  }

  introducerSelect() {
    return this.page.getByRole('link', { name: 'Select Introducer' });
  }

  addIntroducerButton() {
    return this.page.getByRole('button', { name: 'Add Introducer' });
  }

  allReferralHeading() {
    return this.page.getByRole('heading', { name: 'All Referral Companies' });
  }

  allReferralSelect() {
    return this.page.getByRole('link', { name: 'Select Referral Company' });
  }

  addReferralCompanyButton() {
    return this.page.getByRole('button', { name: 'Add Referral Company' });
  }

  addIntroducerHeading() {
    return this.page.getByRole('heading', { name: 'Add Introducer' });
  }

  addIntroducerName() {
    return this.page.getByRole('textbox', { name: 'Introducer Name' });
  }

  addContactName() {
    return this.page.getByRole('textbox', { name: 'Contact Name' });
  }

  addIntroducerEmail() {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  addIntroducerPhone() {
    return this.page.getByRole('textbox', { name: 'Phone number' });
  }

  addIntroducerSourceDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Introducer SourceSelect...' })
      .locator('svg');
  }

  addIntroducerStatusDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Introducer StatusSelect...' })
      .locator('svg');
  }

  addAdviserDropdown() {
    return this.page.locator('label').filter({ hasText: 'AdviserSelect...' }).locator('svg');
  }

  feeSplitTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Fee Type' }).locator('svg');
  }

  adviserGrossNetDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Adviser paid gross or net of' })
      .locator('svg')
      .nth(1);
  }

  feeSplitPercentage() {
    return this.page.getByRole('textbox', { name: 'Split %' });
  }

  addFeeSplitButton() {
    return this.page.getByRole('button', { name: 'Add', exact: true });
  }

  addIntroducerSaveButton() {
    return this.page
      .getByRole('dialog')
      .getByRole('button', { name: 'Add Introducer', exact: true });
  }

  bankDetailsHeading() {
    return this.page.getByText('Bank Details');
  }

  bankAccountName() {
    return this.page.getByRole('textbox', { name: 'Account Name' });
  }

  bankAccountNumber() {
    return this.page.getByRole('textbox', { name: 'Account Number' });
  }

  bankSortCode() {
    return this.page.getByRole('textbox', { name: 'Sort Code' });
  }

  fromDate() {
    return this.page
      .locator('div')
      .filter({ hasText: /^From Date$/ })
      .locator('svg');
  }

  fromDatePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }

  introducerStatusDate() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Introducer Status Date$/ })
      .locator('svg');
  }

  introducerStatusDatePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }
}

export default CompliancePage;
