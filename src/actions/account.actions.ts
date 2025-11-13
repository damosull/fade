import { type Page, expect } from '@playwright/test';
import IndividualPage from '../pages/account.page';
import { waitForNonBlockingUI, findServiceCaseLink } from '../support/helpers';
import { SHORT_WAIT } from '../support/helpers';

export class IndividualActions {
  private readonly page: Page;
  private readonly view: IndividualPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new IndividualPage(page);
  }

  async createAccount(
    accountOption: 'Account' | 'Account & Service Case',
    accountSubType: 'Individual' | 'Trust' | 'Corporation',
    firstName: string | undefined,
    lastName: string | undefined,
    trustName: string | undefined,
    email: string,
    emailTypeSelect: string,
    adviserSelect: string,
    sourceTypeSelect: string | undefined,
    introducerSelect: string | undefined,
    serviceCaseIndicativeValue?: string
  ): Promise<void> {
    await this.view.createNewButton().click();

    await this.view.accountOption().click();
    await this.page.getByRole('option', { name: accountOption, exact: true }).click();

    await this.view.accountTypeSelect().click();
    await this.page.getByRole('option', { name: accountSubType }).click();

    if (accountSubType === 'Individual') {
      await this.view.firstName().fill(firstName!);
      await this.view.lastName().fill(lastName!);
    } else {
      await this.view.trustName().fill(trustName!);
    }

    await this.view.email().fill(email);

    await this.view.emailType().click();
    await this.page.getByRole('option', { name: emailTypeSelect }).click();

    await this.view.newAdviserDropdown().click();
    await this.page.getByRole('option', { name: adviserSelect }).click();

    await this.view.sourceType().click();
    await this.page.getByRole('option', { name: sourceTypeSelect }).click();

    await this.view.introducerSelectDropdown().click();
    await this.page.getByRole('option', { name: introducerSelect }).click();

    if (accountOption === 'Account & Service Case' && serviceCaseIndicativeValue) {
      await this.newAccountServiceCaseDetails(serviceCaseIndicativeValue);
    }
  }

  async newAccountServiceCaseDetails(serviceCaseIndicativeValue: string): Promise<void> {
    await this.view.serviceCaseDate().click();
    await this.view.serviceCaseDatePicker().click();
    await this.view.serviceCaseIndicativeValue().fill(serviceCaseIndicativeValue);
  }

  async saveNewAccount(): Promise<void> {
    await this.view.addAccountButton().click();
  }

  async selectFirstAccount(): Promise<void> {
    await expect(this.view.recentlyViewed()).toBeVisible({ timeout: SHORT_WAIT });
    await expect(this.view.firstListItem()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.firstListItem().click();
    await this.view.viewMore().click();
  }

  async selectSpecificAccount(accountLinkText: string): Promise<void> {
    await expect(this.view.recentlyViewed()).toBeVisible({ timeout: SHORT_WAIT });
    const link = this.page.getByRole('link', { name: accountLinkText, exact: true });
    await expect(link).toBeVisible({ timeout: SHORT_WAIT });
    await link.click();
    await this.view.viewMore().click();
  }

  async addSearchAddress(addressQuery: string): Promise<void> {
    await expect(this.view.addNewAddressButton()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.addNewAddressButton().click();
    await this.view.addressType().click();
    await this.view.addressTypeSelect().click();
    await this.view.searchAddress().fill(addressQuery);
    await this.view.selectAddress().click();
    await this.view.addAddressButton().click();
  }

  async addManualAddress(
    addressLine1: string,
    addressLine2: string,
    city: string,
    postCode: string
  ): Promise<void> {
    await expect(this.view.addNewAddressButton()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.addNewAddressButton().click();
    await this.view.addressType().click();
    await this.view.addressTypeSelect().click();
    await this.view.addressLine1().fill(addressLine1);
    await this.view.addressLine2().fill(addressLine2);
    await this.view.city().fill(city);
    await this.view.postCode().fill(postCode);
    await this.view.addAddressButton().click();
  }

  async addIndividualDetails(
    maritalStatus: string,
    employeeStatus: string,
    nationalityAndCitizenship: string,
    countryOfBirth: string,
    inGoodHealth: string,
    hasSmokedInLast12Months: string
  ): Promise<void> {
    await this.view.maritalStatus().selectOption({ label: maritalStatus });
    await this.view.clientDetails().click();
    await this.view.employeeStatus().selectOption({ label: employeeStatus });
    await this.view.nationalityAndCitizenship().selectOption({ label: nationalityAndCitizenship });
    await this.view.countryOfBirth().selectOption({ label: countryOfBirth });
    await this.view.ukResidentForTaxPurposes().check();
    await this.view.inGoodHealth().selectOption({ label: inGoodHealth });
    await this.view.hasSmokedInLast12Months().selectOption({ label: hasSmokedInLast12Months });
    await this.view.saveButton().first().click();
  }

  async individualServiceDetail(extRef: string): Promise<void> {
    await this.view.extRef().fill(extRef);
    await this.view.servDetailSave().click();
  }

  async sourceDetails(): Promise<void> {
    await expect(this.view.initialFeeSplit()).toBeVisible({ timeout: SHORT_WAIT });
    await expect(this.view.ongoingFeeSplit()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.sourceDetailSave().click();
  }

  async addEmploymentDetails(employer: string, jobTitle: string): Promise<void> {
    await this.view.addEmploymentButton().click();
    await this.view.employer().fill(employer);
    await this.view.jobTitle().fill(jobTitle);
    await this.view.fromDate().click();
    await this.view.fromDatePicker().click();
    await this.view.employmentStatus().click();
    await this.view.employmentType().click();
    await waitForNonBlockingUI(this.page);
    await this.view.employmentSave().click();
  }

  async addIncomeDetails(addName: string, grossAmount: string, incomeType: string): Promise<void> {
    await this.view.selectEmployer().click();
    await this.view.addIncomeButton().click();
    await expect(this.view.addIncomeHeading()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.incomeFrequency().click();
    await this.view.incomeFrequencySelect().click();
    await this.view.incomeTypeDropdown().click();
    await this.page.getByRole('option', { name: incomeType }).click();
    await this.view.addName().fill(addName);
    await this.view.grossAmount().fill(grossAmount);
    await this.view.incomeDateDropdown().click();
    await this.view.incomeDatePicker().click();
    await this.view.incomeSave().click();
  }

  async clickServiceCase(selectServiceCase: string): Promise<void> {
    await this.view.searchServiceCasesInput().fill(selectServiceCase);
    const link = findServiceCaseLink(this.page, selectServiceCase);
    await link.click();
  }
}

export default IndividualActions;
