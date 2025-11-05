import { type Locator, type Page, expect } from '@playwright/test';

export class IndividualPage {
  //variables
  readonly page: Page;
  readonly createNewButton: Locator;
  readonly createAccountHeading: Locator;
  readonly accountOption: Locator;
  readonly accountOptionSelect: Locator;
  readonly accountTypeSelect: Locator;
  readonly accountSubType: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly sourceType: Locator;
  readonly sourceTypeSelect: Locator;
  readonly channelType: Locator;
  readonly channelTypeSelect: Locator;
  readonly email: Locator;
  readonly emailType: Locator;
  readonly emailTypeSelect: Locator;
  readonly phoneNumber: Locator;
  readonly addAccountButton: Locator;
  readonly addNewAddressButton: Locator;
  readonly addressType: Locator;
  readonly searchAddress: Locator;
  readonly selectAddress: Locator;
  readonly addIncomeHeading: Locator;
  readonly addAddressButton: Locator;
  readonly accountDetails: Locator;
  readonly clientDetails: Locator;
  readonly clientAccountDetails: Locator;
  readonly maritalStatus: Locator;
  readonly maritalDetails: Locator;
  readonly employeeStatus: Locator;
  readonly nationalityAndCitizenship: Locator;
  readonly countryOfBirth: Locator;
  readonly ukResidentForTaxPurposes: Locator;
  readonly inGoodHealth: Locator;
  readonly hasSmokedInLast12Months: Locator;
  readonly saveButton: Locator;
  readonly adviser: Locator;
  readonly adviserSelect: Locator;
  readonly extRef: Locator;
  readonly servDetailSave: Locator;
  readonly addEmploymentButton: Locator;
  readonly employer: Locator;
  readonly jobTitle: Locator;
  readonly fromDate: Locator;
  readonly fromDatePicker: Locator;
  readonly employmentStatus: Locator;
  readonly employmentType: Locator;
  readonly employmentSave: Locator;
  readonly addIncomeButton: Locator;
  readonly incomeType: Locator;
  readonly addName: Locator;
  readonly incomeFrequency: Locator;
  readonly incomeFrequencySelect: Locator;
  readonly grossAmount: Locator;
  readonly incomeDateDropdown: Locator;
  readonly incomeDatePicker: Locator;
  readonly incomeSave: Locator;
  readonly incomeDelete: Locator;
  readonly incomeEdit: Locator;
  readonly incomeEditSave: Locator;
  readonly recentlyViewed: Locator;
  readonly viewMore: Locator;
  readonly firstListItem: Locator;
  readonly addressTypeSelect: Locator;
  readonly selectEmployer: Locator;
  readonly newAdviserDropdown: Locator;
  readonly newAdviserSelect: Locator;
  readonly serviceCaseDate: Locator;
  readonly serviceCaseDatePicker: Locator;
  readonly serviceCaseIndicativeValue: Locator;
  readonly initalFeeSplit: Locator;
  readonly ongoingFeeSplit: Locator;
  readonly sourceDetailSave: Locator;
  readonly introducerSelectDropdown: Locator;
  readonly introducerSelect: Locator;
  readonly addressLine1: Locator;
  readonly addressLine2: Locator;
  readonly city: Locator;
  readonly postCode: Locator;
  readonly specificListItem: Locator;
  readonly serviceCaseHeading: Locator;
  readonly selectServiceCase: Locator;

  //constructors

  constructor(page: Page) {
    this.page = page;
    this.createNewButton = page.getByRole('button', { name: 'Create New' });
    this.createAccountHeading = page.getByRole('heading', { name: 'Create New' });
    this.accountOption = page.getByRole('dialog').locator('svg').nth(1);
    this.accountOptionSelect = page.getByRole('option', { name: 'Account', exact: true });
    this.serviceCaseHeading = page.getByRole('heading', { name: 'My Service Cases' });
    this.selectServiceCase = page.getByRole('link', {
      name: 'income Rec-2025-10-10T11-21-26-536Z',
      exact: true,
    });
    this.accountTypeSelect = page
      .locator('label')
      .filter({ hasText: 'Account TypeSelect...' })
      .locator('svg');
    this.accountSubType = page.getByRole('option', { name: 'Individual' });
    this.firstName = page.getByRole('textbox', { name: 'First Name' });
    this.lastName = page.getByRole('textbox', { name: 'Last Name' });
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.phoneNumber = page.getByRole('textbox', { name: 'Phone Number' });
    this.addAccountButton = page.getByRole('button', { name: 'Add Account' });
    this.accountDetails = page.getByRole('group', { name: 'Account Details' });
    this.clientDetails = page.getByRole('button', { name: 'View more' });
    this.clientAccountDetails = page.getByRole('group', { name: 'Client Account Details' });
    this.maritalStatus = page.getByRole('group', { name: 'Marital Status' });
    this.maritalDetails = page
      .getByRole('group', { name: 'Marital Details' })
      .getByPlaceholder('dd/mm/yyyy');
    this.employeeStatus = page.getByRole('combobox', { name: 'Employment Status' });
    this.nationalityAndCitizenship = page.getByRole('combobox', {
      name: 'Nationality United Kingdom of',
    });
    this.countryOfBirth = page.getByRole('combobox', { name: 'Country Of Birth' });
    this.ukResidentForTaxPurposes = page.getByRole('checkbox', {
      name: 'UK Resident For Tax Purposes',
    });
    this.inGoodHealth = page.getByRole('combobox', { name: 'In Good Health ,' });
    this.hasSmokedInLast12Months = page.getByRole('combobox', {
      name: 'Has Smoked In Last 12 Months',
    });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.addNewAddressButton = page.getByRole('button', { name: 'Add Address' });
    this.addressType = page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'TypeSelect...' })
      .locator('svg');
    this.addressTypeSelect = page.getByRole('option', { name: 'home', exact: true });
    this.searchAddress = page.getByRole('combobox', { name: 'Search address' });
    this.selectAddress = page.getByRole('option', { name: '104 Dersingham Avenue, London' });
    this.addAddressButton = page.getByRole('button', { name: 'Add' });
    this.adviser = page.locator('label').filter({ hasText: 'Adviser' }).locator('svg');
    this.adviserSelect = page.getByRole('option', { name: 'Billy Ambler' });
    this.extRef = page.getByRole('textbox', { name: 'External Reference' });
    this.servDetailSave = page.getByRole('button', { name: 'Save' }).nth(2);
    this.addEmploymentButton = page.getByRole('button', { name: 'Add employment' });
    this.employer = page.getByRole('textbox', { name: 'Employer' });
    this.jobTitle = page.getByRole('textbox', { name: 'Job Title' });
    this.fromDate = page
      .locator('div')
      .filter({ hasText: /^From Date$/ })
      .locator('svg');
    this.fromDatePicker = page.locator('.react-datepicker__day--today');
    this.employmentStatus = page.getByRole('combobox', { name: 'Employment Status' });
    this.employmentType = page.getByRole('combobox', { name: 'Type of employment' });
    this.employmentSave = page.getByRole('button', { name: 'Add', exact: true });
    this.selectEmployer = page.getByRole('cell', { name: 'Fade', exact: true }).first();
    this.addIncomeHeading = page.getByRole('heading', { name: 'Add Income' });
    this.addIncomeButton = page.getByRole('button', { name: 'Add Income' });
    this.incomeType = page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'TypeSelect...' })
      .locator('svg');
    this.addName = page.getByRole('textbox', { name: 'Name' });
    this.incomeFrequency = page
      .locator('label')
      .filter({ hasText: 'FrequencySelect...' })
      .locator('svg');
    this.incomeFrequencySelect = page.getByRole('option', { name: 'Monthly' });
    this.grossAmount = page.getByRole('textbox', { name: 'Gross Amount (monthly)' });
    this.incomeDateDropdown = page
      .getByRole('dialog')
      .getByRole('group', { name: 'Details' })
      .locator('svg')
      .nth(1);
    this.incomeDatePicker = page.locator('.react-datepicker__day--today');
    this.incomeSave = page.getByRole('button', { name: 'Save' });
    this.incomeDelete = page.getByRole('button', { name: 'Delete' });
    this.incomeEdit = page.getByRole('button', { name: 'Edit' });
    this.incomeEditSave = page.getByRole('button', { name: 'Save' });
    this.recentlyViewed = page.getByRole('heading', { name: 'Recently Viewed Accounts' });
    this.viewMore = page.getByRole('button', { name: 'View more' });
    this.firstListItem = page.locator('a[href*="accounts"]').first();
    this.specificListItem = page.getByRole('link', { name: 'Individual: Mr mikelink a' });
    this.sourceType = page
      .locator('label')
      .filter({ hasText: 'High Level SourceSelect...' })
      .locator('svg');
    this.sourceTypeSelect = page.getByRole('option', { name: 'firm generated' });
    this.channelType = page.locator('label').filter({ hasText: 'ChannelSelect...' }).locator('svg');
    this.channelTypeSelect = page.getByRole('option', { name: 'Unbiased - paid' });
    this.introducerSelectDropdown = page
      .locator('label')
      .filter({ hasText: 'IntroducerSelect...' })
      .locator('svg');
    this.introducerSelect = page.getByRole('option', {
      name: 'Test Firm introducer-2025-09-03T11-32-24-784Z',
    });
    this.emailType = page
      .locator('label')
      .filter({ hasText: 'Email typeSelect...' })
      .locator('svg');
    this.emailTypeSelect = page.getByRole('option', { name: 'Personal' });
    this.newAdviserDropdown = page
      .locator('label')
      .filter({ hasText: 'adviserSelect' })
      .locator('svg');
    this.newAdviserSelect = page.getByRole('option', { name: 'Test Superadmin' });
    this.serviceCaseDate = page.getByRole('group', { name: 'Service Case' }).locator('svg');
    this.serviceCaseDatePicker = page.locator('.react-datepicker__day--today');
    this.serviceCaseIndicativeValue = page.getByRole('textbox', { name: 'Indicative Value' });
    this.initalFeeSplit = page.getByRole('textbox', { name: 'Initial Fee Split to Adviser %' });
    this.ongoingFeeSplit = page.getByRole('textbox', { name: 'Ongoing Split to Adviser %' });
    this.sourceDetailSave = page
      .locator('fieldset')
      .filter({ hasText: 'DetailsSourcefirm' })
      .getByRole('button');
    this.addressLine1 = page.getByRole('textbox', { name: 'Address Line 1' });
    this.addressLine2 = page.getByRole('textbox', { name: 'Address Line 2' });
    this.city = page.getByRole('textbox', { name: 'City' });
    this.postCode = page.getByRole('textbox', { name: 'Post code' });
  }

  //methods
  private async waitForNonBlockingUI(): Promise<void> {
    // Wait for common status/toast overlays that may intercept clicks to disappear.
    // If they are not present, continue immediately.
    const possibleBlockers = [
      this.page.locator('div[role="status"]'),
      this.page.locator('div[aria-live="polite"]'),
    ];

    for (const blocker of possibleBlockers) {
      // First, give a moment for any toast to appear after previous actions
      // then wait for it to be hidden or detached; ignore timeouts if none present.
      try {
        const isVisible = await blocker.isVisible({ timeout: 500 });
        if (isVisible) {
          await blocker.waitFor({ state: 'hidden', timeout: 5000 });
        }
      } catch {
        // Ignore if not present/visible.
      }
    }
  }
  async createIndividualAccount(
    accountOptionSelect: string,
    accountSubType: string,
    firstName: string,
    lastName: string,
    email: string,
    emailTypeSelect: string,
    sourceTypeSelect: string,
    newAdviserSelect: string,
    introducerSelect: string
  ) {
    await this.createNewButton.click();
    await this.accountOption.click();
    await this.page.getByRole('option', { name: accountOptionSelect, exact: true }).click();
    await this.accountTypeSelect.click();
    await this.page.getByRole('option', { name: accountSubType }).click();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.emailType.click();
    await this.page.getByRole('option', { name: emailTypeSelect }).click();
    await this.sourceType.click();
    await this.page.getByRole('option', { name: sourceTypeSelect }).click();
    await this.newAdviserDropdown.click();
    await this.page.getByRole('option', { name: newAdviserSelect }).click();
    await this.introducerSelectDropdown.click();
    await this.page.getByRole('option', { name: introducerSelect }).click();
  }

  async newAccountServiceCaseDetails(serviceCaseIndicativeValue: string) {
    await this.serviceCaseDate.click();
    await this.serviceCaseDatePicker.click();
    await this.serviceCaseIndicativeValue.fill(serviceCaseIndicativeValue);
  }

  async saveNewAccount() {
    await this.addAccountButton.click();
  }

  async selectFirstAccount() {
    await expect(this.recentlyViewed).toBeVisible({ timeout: 5000 });
    await expect(this.firstListItem).toBeVisible({ timeout: 5000 });
    await this.firstListItem.click();
    await this.viewMore.click();
  }

  async selectSpecificAccount(specificListItem: string) {
    await expect(this.recentlyViewed).toBeVisible({ timeout: 5000 });
    await this.specificListItem.selectOption({ label: specificListItem });
    await this.viewMore.click();
  }

  async addSearchAddress(searchAddress: string) {
    await expect(this.addNewAddressButton).toBeVisible();
    await this.addNewAddressButton.click();
    await this.addressType.click();
    await this.addressTypeSelect.click();
    await this.searchAddress.fill(searchAddress);
    await this.selectAddress.click();
    await this.addAddressButton.click();
  }

  async addManualAddress(
    addressLine1: string,
    addressLine2: string,
    city: string,
    postCode: string
  ) {
    await expect(this.addNewAddressButton).toBeVisible();
    await this.addNewAddressButton.click();
    await this.addressType.click();
    await this.addressTypeSelect.click();
    await this.addressLine1.fill(addressLine1);
    await this.addressLine2.fill(addressLine2);
    await this.city.fill(city);
    await this.postCode.fill(postCode);
    await this.addAddressButton.click();
  }

  async addIndividualDetails(
    maritalStatus: string,
    employeeStatus: string,
    nationalityAndCitizenship: string,
    countryOfBirth: string,
    inGoodHealth: string,
    hasSmokedInLast12Months: string
  ) {
    await this.maritalStatus.selectOption({ label: maritalStatus });
    await this.clientDetails.click();
    await this.employeeStatus.selectOption({ label: employeeStatus });
    await this.nationalityAndCitizenship.selectOption({ label: nationalityAndCitizenship });
    await this.countryOfBirth.selectOption({ label: countryOfBirth });
    await this.ukResidentForTaxPurposes.check();
    await this.inGoodHealth.selectOption({ label: inGoodHealth });
    await this.hasSmokedInLast12Months.selectOption({ label: hasSmokedInLast12Months });
    await this.saveButton.first().click();
  }

  async individualServiceDetail(extRef: string) {
    await this.extRef.fill(extRef);
    await this.servDetailSave.click();
  }

  async sourceDetails() {
    expect(this.initalFeeSplit).toBeTruthy();
    expect(this.ongoingFeeSplit).toBeTruthy();
    await this.sourceDetailSave.click();
  }

  async addEmploymentDetails(employer: string, jobTitle: string) {
    await this.addEmploymentButton.click();
    await this.employer.fill(employer);
    await this.jobTitle.fill(jobTitle);
    await this.fromDate.click();
    await this.fromDatePicker.click();
    await this.employmentStatus.click();
    await this.employmentType.click();
    await this.waitForNonBlockingUI();
    await this.employmentSave.click();
  }

  async addIncomeDetails(addName: string, grossAmount: string, incomeType: string) {
    await this.selectEmployer.click();
    await this.addIncomeButton.click();
    await expect(this.addIncomeHeading).toBeVisible({ timeout: 5000 });
    await this.incomeFrequency.click();
    await this.incomeFrequencySelect.click();
    await this.incomeType.click();
    await this.page.getByRole('option', { name: incomeType }).click();
    await this.addName.fill(addName);
    await this.grossAmount.fill(grossAmount);
    await this.incomeDateDropdown.click();
    await this.incomeDatePicker.click();
    await this.incomeSave.click();
  }

  findServiceCaseLink(selectServiceCase: string): Locator {
    const escaped = selectServiceCase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.page.locator('a[href*="/serviceCases/"]').getByText(new RegExp(escaped, 'i'));
  }

  async clickServiceCase(selectServiceCase: string): Promise<void> {
    const link = this.findServiceCaseLink(selectServiceCase);
    await link.click();
  }
}

export default IndividualPage;
