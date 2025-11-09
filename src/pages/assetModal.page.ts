import { type Page } from '@playwright/test';

export class AssetModalPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  addAssetHeading() {
    return this.page.getByRole('heading', { name: 'Add Asset' });
  }

  assetTypeDropdown() {
    return this.page.getByRole('group', { name: 'Overview' }).locator('svg');
  }

  selectAssetTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  assetSubTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Sub TypeSelect' }).locator('svg');
  }

  selectAssetSubTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  pensionTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Pension TypeSelect' }).locator('svg');
  }

  selectPensionTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addAssetSaveButton() {
    return this.page.getByRole('button', { name: 'Add Asset' });
  }

  heldOnPlatformCheckBox() {
    return this.page.getByRole('checkbox', { name: 'Is asset held on a platform' });
  }

  agencyStatusDropdown() {
    return this.page.locator('label').filter({ hasText: 'Agency StatusSelect' }).locator('svg');
  }

  selectAgencyStatusOption(name: string, exact = true) {
    return this.page.getByRole('option', { name, exact });
  }

  agencyStatusDateDropdown() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Agency Status Date$/ })
      .locator('svg');
  }

  agencyStatusDatePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }

  policyName() {
    return this.page.getByRole('textbox', { name: 'Policy Name' });
  }

  providerDropdown() {
    return this.page.locator('label').filter({ hasText: 'ProviderSelect...' }).locator('svg');
  }

  selectProviderOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  wrapId() {
    return this.page.getByRole('textbox', { name: 'Wrap ID' });
  }

  policyStartDateDropdown() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Start Date$/ })
      .locator('svg');
  }

  fromDatePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }

  policyNumber() {
    return this.page.getByRole('textbox', { name: 'Policy Number', exact: true });
  }

  secondaryPolicyNumber() {
    return this.page.getByRole('textbox', { name: 'Secondary Policy Number' });
  }

  normalRetirementDateDropdown() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Normal Retirement Date$/ })
      .locator('svg');
  }

  policyStatusDropdown() {
    return this.page.locator('label').filter({ hasText: 'Policy StatusSelect...' }).locator('svg');
  }

  selectPolicyStatusOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  crystallised() {
    return this.page.getByRole('textbox', { name: 'Crystallised' });
  }

  membershipStatusDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Membership StatusSelect...' })
      .locator('svg');
  }

  selectMembershipStatusOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  employmentDropdown() {
    return this.page.locator('label').filter({ hasText: 'EmploymentSelect...' }).locator('svg');
  }

  drawdownStatusDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Drawdown StatusSelect...' })
      .locator('svg');
  }

  selectDrawdownStatusOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addValuationButton() {
    return this.page.getByRole('button', { name: 'Valuations' });
  }

  assetValuationHeading() {
    return this.page.getByRole('heading', { name: 'Asset Valuations' });
  }

  assetValue() {
    return this.page.getByRole('textbox', { name: 'Value' });
  }

  assetValuationDateDropdown() {
    return this.page.getByRole('group', { name: 'Add New Valuation' }).locator('svg');
  }

  assetValuationDatePickerToday() {
    return this.page.locator('.react-datepicker__day--today');
  }

  saveValuationButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }
}

export default AssetModalPage;
