import { type Page } from '@playwright/test';

export class IndividualPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  modal() {
    return this.page.locator('div[role="dialog"]');
  }

  createNewButton() {
    return this.page.getByRole('button', { name: 'Create New' });
  }

  createAccountHeading() {
    return this.page.getByRole('heading', { name: 'Create New' });
  }

  accountOption() {
    return this.page.getByRole('dialog').locator('svg').nth(1);
  }

  accountOptionSelect() {
    return this.page.getByRole('option', { name: 'Account', exact: true });
  }

  serviceCaseHeading() {
    return this.page.getByRole('heading', { name: 'My Service Cases' });
  }

  accountTypeSelect() {
    return this.page.locator('label').filter({ hasText: 'Account TypeSelect...' }).locator('svg');
  }

  accountSubTypeOption() {
    return this.page.getByRole('option', { name: 'Individual' });
  }

  firstName() {
    return this.page.getByRole('textbox', { name: 'First Name' });
  }

  lastName() {
    return this.page.getByRole('textbox', { name: 'Last Name' });
  }

  name() {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  email() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }

  phoneNumber() {
    return this.page.getByRole('textbox', { name: 'Phone Number' });
  }

  addAccountButton() {
    return this.page.getByRole('button', { name: 'Add Account' });
  }

  accountDetails() {
    return this.page.getByRole('group', { name: 'Account Details' });
  }

  clientDetails() {
    return this.page.getByRole('button', { name: 'View more' });
  }

  clientAccountDetails() {
    return this.page.getByRole('group', { name: 'Client Account Details' });
  }

  maritalStatus() {
    return this.page.getByRole('group', { name: 'Marital Status' });
  }

  maritalDetails() {
    return this.page.getByRole('group', { name: 'Marital Details' }).getByPlaceholder('dd/mm/yyyy');
  }

  employeeStatus() {
    return this.page.getByRole('combobox', { name: 'Employment Status' });
  }

  nationalityAndCitizenship() {
    return this.page.getByRole('combobox', { name: 'Nationality United Kingdom of' });
  }

  countryOfBirth() {
    return this.page.getByRole('combobox', { name: 'Country Of Birth' });
  }

  ukResidentForTaxPurposes() {
    return this.page.getByRole('checkbox', { name: 'UK Resident For Tax Purposes' });
  }

  inGoodHealth() {
    return this.page.getByRole('combobox', { name: 'In Good Health ,' });
  }

  hasSmokedInLast12Months() {
    return this.page.getByRole('combobox', { name: 'Has Smoked In Last 12 Months' });
  }

  saveButton() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  addNewAddressButton() {
    return this.page.getByRole('button', { name: 'Add Address' });
  }

  addressType() {
    return this.page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'TypeSelect...' })
      .locator('svg');
  }

  addressTypeOption(addressType: string) {
    return this.page.getByRole('option', { name: addressType, exact: true });
  }

  searchAddress() {
    return this.page.getByRole('combobox', { name: 'Search address' });
  }

  selectAddress() {
    return this.page.getByRole('option', { name: '104 Dersingham Avenue, London' });
  }

  addAddressButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  adviser() {
    return this.page.locator('label').filter({ hasText: 'Adviser' }).locator('svg');
  }

  adviserSelect() {
    return this.page.getByRole('option', { name: 'Billy Ambler' });
  }

  extRef() {
    return this.page.getByRole('textbox', { name: 'External Reference' });
  }

  servDetailSave() {
    return this.page.getByRole('button', { name: 'Save' }).nth(2);
  }

  addEmploymentButton() {
    return this.page.getByRole('button', { name: 'Add employment' });
  }

  employer() {
    return this.page.getByRole('textbox', { name: 'Employer' });
  }

  jobTitle() {
    return this.page.getByRole('textbox', { name: 'Job Title' });
  }

  fromDate() {
    return this.page
      .locator('div')
      .filter({ hasText: /^From Date$/ })
      .locator('svg');
  }

  fromDatePicker() {
    return this.page.locator('.react-datepicker__day--today');
  }

  employmentStatus() {
    return this.page.getByRole('combobox', { name: 'Employment Status' });
  }

  employmentType() {
    return this.page.getByRole('combobox', { name: 'Type of employment' });
  }

  employmentSave() {
    return this.page.getByRole('button', { name: 'Add', exact: true });
  }

  selectEmployer() {
    return this.page.getByRole('cell', { name: 'Fade', exact: true }).first();
  }

  addIncomeHeading() {
    return this.page.getByRole('heading', { name: 'Add Income' });
  }

  addIncomeButton() {
    return this.page.getByRole('button', { name: 'Add Income' });
  }

  incomeTypeDropdown() {
    return this.page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'TypeSelect...' })
      .locator('svg');
  }

  addName() {
    return this.page.getByRole('textbox', { name: 'Name' });
  }

  incomeFrequency() {
    return this.page.locator('label').filter({ hasText: 'FrequencySelect...' }).locator('svg');
  }

  incomeFrequencySelect() {
    return this.page.getByRole('option', { name: 'Monthly' });
  }

  grossAmount() {
    return this.page.getByRole('textbox', { name: 'Gross Amount (monthly)' });
  }

  incomeDateDropdown() {
    return this.page
      .getByRole('dialog')
      .getByRole('group', { name: 'Details' })
      .locator('svg')
      .nth(1);
  }

  incomeDatePicker() {
    return this.page.locator('.react-datepicker__day--today');
  }

  incomeSave() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  incomeDelete() {
    return this.page.getByRole('button', { name: 'Delete' });
  }

  incomeEdit() {
    return this.page.getByRole('button', { name: 'Edit' });
  }

  incomeEditSave() {
    return this.page.getByRole('button', { name: 'Save' });
  }

  recentlyViewed() {
    return this.page.getByRole('heading', { name: 'Recently Viewed Accounts' });
  }

  viewMore() {
    return this.page.getByRole('button', { name: 'View more' });
  }

  firstListItem() {
    return this.page.locator('a[href*="accounts"]').first();
  }

  specificListItem() {
    return this.page.getByRole('link', { name: 'Individual: Mr mikelink a' });
  }

  sourceType() {
    return this.page
      .locator('label')
      .filter({ hasText: 'High Level SourceSelect...' })
      .locator('svg');
  }

  sourceTypeSelect() {
    return this.page.getByRole('option', { name: 'firm generated' });
  }

  channelType() {
    return this.page.locator('label').filter({ hasText: 'ChannelSelect...' }).locator('svg');
  }

  channelTypeSelect() {
    return this.page.getByRole('option', { name: 'Unbiased - paid' });
  }

  introducerSelectDropdown() {
    return this.page.locator('label').filter({ hasText: 'IntroducerSelect...' }).locator('svg');
  }

  emailType() {
    return this.page.locator('label').filter({ hasText: 'Email typeSelect...' }).locator('svg');
  }

  emailTypeSelect() {
    return this.page.getByRole('option', { name: 'Personal' });
  }

  newAdviserDropdown() {
    return this.page.locator('label').filter({ hasText: 'adviserSelect' }).locator('svg');
  }

  serviceCaseDate() {
    return this.page.getByRole('group', { name: 'Service Case' }).locator('svg');
  }

  serviceCaseDatePicker() {
    return this.page.locator('.react-datepicker__day--today');
  }

  serviceCaseIndicativeValue() {
    return this.page.getByRole('textbox', { name: 'Indicative Value' });
  }

  initialFeeSplit() {
    return this.page.getByRole('textbox', { name: 'Initial Fee Split to Adviser %' });
  }

  ongoingFeeSplit() {
    return this.page.getByRole('textbox', { name: 'Ongoing Split to Adviser %' });
  }

  sourceDetailSave() {
    return this.page
      .locator('fieldset')
      .filter({ hasText: 'DetailsSourcefirm' })
      .getByRole('button');
  }

  addressLine1() {
    return this.page.getByRole('textbox', { name: 'Address Line 1' });
  }

  addressLine2() {
    return this.page.getByRole('textbox', { name: 'Address Line 2' });
  }

  city() {
    return this.page.getByRole('textbox', { name: 'City' });
  }

  county() {
    return this.page.getByRole('textbox', { name: 'County' });
  }

  postCode() {
    return this.page.getByRole('textbox', { name: 'Post code' });
  }

  useForCorrespondenceCheckbox() {
    return this.page.getByRole('checkbox', { name: 'Use this address for correspondence?' });
  }

  myServiceCasesCard() {
    return this.page.getByRole('heading', { name: 'My Service Cases' }).locator('..').locator('..');
  }

  searchServiceCasesInput() {
    return this.myServiceCasesCard().getByPlaceholder('Account Name');
  }
}

export default IndividualPage;
