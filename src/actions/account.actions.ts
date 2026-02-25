import { type Page, expect } from '@playwright/test';
import IndividualPage from '../pages/account.page';
import {
  waitForNonBlockingUI,
  findServiceCaseLink,
  chooseDropdownOption,
} from '../support/helpers';

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
    name: string | undefined,
    email: string,
    emailTypeSelect: string,
    adviserSelect: string | undefined,
    sourceTypeSelect: string,
    introducerSelect: string,
    serviceCaseIndicativeValue?: string | undefined
  ): Promise<void> {
    await this.view.createNewButton().click();

    await this.view.accountOption().click();
    await chooseDropdownOption(this.page, accountOption, true);

    await this.view.accountTypeSelect().click();
    await chooseDropdownOption(this.page, accountSubType);

    if (accountSubType === 'Individual') {
      await this.view.firstName().fill(firstName!);
      await this.view.lastName().fill(lastName!);
    } else {
      await this.view.name().fill(name!);
    }

    await this.view.email().fill(email);

    await this.view.emailType().click();
    await chooseDropdownOption(this.page, emailTypeSelect);

    if (adviserSelect) {
      await this.view.newAdviserDropdown().click();
      await chooseDropdownOption(this.page, adviserSelect);
    }

    await this.view.sourceType().click();
    await chooseDropdownOption(this.page, sourceTypeSelect);

    await this.view.introducerSelectDropdown().click();
    await chooseDropdownOption(this.page, introducerSelect);

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
    await expect(this.view.recentlyViewed()).toBeVisible();
    await expect(this.view.firstListItem()).toBeVisible();
    await this.view.firstListItem().click();
    await this.view.viewMore().click();
  }

  async selectSpecificAccount(accountLinkText: string): Promise<void> {
    await expect(this.view.recentlyViewed()).toBeVisible();
    const link = this.page.getByRole('link', { name: accountLinkText, exact: true });
    await expect(link).toBeVisible();
    await link.click();
    await this.view.viewMore().click();
  }

  async addSearchAddress(addressQuery: string, addressType: string = 'home'): Promise<void> {
    await expect(this.view.addNewAddressButton()).toBeVisible();
    await this.view.addNewAddressButton().click();
    await this.view.addressType().click();
    await this.view.addressTypeOption(addressType).click();
    await this.view.searchAddress().fill(addressQuery);
    await this.view.selectAddress().click();
    await this.view.addAddressButton().click();
  }

  async addManualAddress(
    addressLine1: string,
    addressLine2: string,
    city: string,
    county: string,
    postCode: string,
    addressType: string = 'home',
    useForCorrespondence: boolean = false
  ): Promise<void> {
    await expect(this.view.addNewAddressButton()).toBeVisible();
    await this.view.addNewAddressButton().click();
    await this.view.addressType().click();
    await this.view.addressTypeOption(addressType).click();
    await this.view.addressLine1().fill(addressLine1);
    await this.view.addressLine2().fill(addressLine2);
    await this.view.city().fill(city);
    await this.view.county().fill(county);
    await this.view.postCode().fill(postCode);
    if (useForCorrespondence) {
      await this.view.useForCorrespondenceCheckbox().check();
    }
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
    await expect(this.view.initialFeeSplit()).toBeVisible();
    await expect(this.view.ongoingFeeSplit()).toBeVisible();
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
    await expect(this.view.addIncomeHeading()).toBeVisible();
    await this.view.incomeFrequency().click();
    await this.view.incomeFrequencySelect().click();
    await this.view.incomeTypeDropdown().click();
    await chooseDropdownOption(this.page, incomeType);
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
