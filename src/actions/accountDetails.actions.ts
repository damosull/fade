import { type Page, expect } from '@playwright/test';
import AccountDetailsPage from '../pages/accountDetails.page';
import { clickWhenVisible, chooseDropdownOption } from '../support/helpers';

export class AccountDetailsActions {
  private readonly page: Page;
  private readonly view: AccountDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AccountDetailsPage(page);
  }

  async assertOnDetailsTab() {
    await expect(this.page).toHaveURL(/\/accounts\/\d+$/);
    await expect(this.view.detailsTab()).toBeVisible();
  }

  async assertAccountName(firstName: string, lastName: string) {
    const heading = this.view.getAccountNameHeading(firstName, lastName);
    await expect(heading).toBeVisible();
  }

  async assertTrustName(name: string) {
    const heading = this.view.getTrustNameHeading(name);
    await expect(heading).toBeVisible();
  }

  async assertAccountNumberExists() {
    await expect(this.view.accountNumberHeading()).toBeVisible();
    const accountNumber = await this.view.accountNumberHeading().textContent();
    expect(accountNumber).toMatch(/ACC\d{7}/);
    return accountNumber;
  }

  async assertEmailDisplayed(email: string) {
    const emailLink = this.view.getEmailLink(email);
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveText(email);
  }

  async selectTitle(title: string) {
    await this.view.titleInput().click();
    await this.page.getByRole('option', { name: title }).click();
  }

  async fillMiddleNames(middleNames: string) {
    await this.view.middleNamesInput().fill(middleNames);
  }

  async selectGender(gender: string) {
    await this.view.genderInput().click();
    await this.page.getByRole('option', { name: gender }).click();
  }

  async selectMaritalStatus(status: string) {
    await this.view.maritalStatusInput().click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async fillMaidenName(maidenName: string) {
    await this.view.maidenNameInput().fill(maidenName);
  }

  async selectEmploymentStatus(status: string) {
    await this.view.employmentStatusInput().click();
    await this.page.getByRole('option', { name: status }).click();
  }

  async fillNINumber(niNumber: string) {
    await this.view.niNumberInput().fill(niNumber);
  }

  async selectNationality(nationality: string) {
    await this.view.nationalityInput().click();
    await this.page.getByRole('option', { name: nationality }).click();
  }

  async checkUKResidentForTax() {
    const checkbox = this.view.ukResidentForTaxCheckbox();
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async checkUKDomicile() {
    const checkbox = this.view.ukDomicileCheckbox();
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async selectInGoodHealth(option: string) {
    await this.view.inGoodHealthInput().click();
    await this.page.getByRole('option', { name: option }).click();
  }

  async selectHasSmokedInLast12Months(option: string) {
    await this.view.hasSmokedInput().click();
    await this.page.getByRole('option', { name: option }).click();
  }

  async checkHasWill() {
    const checkbox = this.view.hasWillCheckbox();
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async checkIsWillUpToDate() {
    const checkbox = this.view.isWillUpToDateCheckbox();
    if (!(await checkbox.isChecked())) {
      await checkbox.check();
    }
  }

  async clickPersonalDetailsSave() {
    await this.view.personalDetailsSaveButton().click();
  }

  async clickPersonalDetailsSaveAndWaitForResponse() {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/graphql') && response.request().method() === 'POST'
    );

    await this.view.personalDetailsSaveButton().click();

    return await responsePromise;
  }

  async selectCorrespondenceMethod(method: string) {
    await this.view.correspondenceMethodInput().click();
    await this.view.correspondenceMethodOption(method).click();
  }

  async selectCorrespondenceType(type: string) {
    await this.view.correspondenceTypeInput().click();
    await this.view.correspondenceTypeOption(type).click();
  }

  async fillCorrespondencePhoneNumber(phoneNumber: string) {
    await this.view.correspondencePhoneNumberInput().fill(phoneNumber);
  }

  async clickAddCorrespondenceMethod() {
    await this.view.correspondenceAddButton().click();
  }

  async addCorrespondenceMethod(method: string, type: string, phoneNumber: string) {
    await this.selectCorrespondenceMethod(method);
    await this.selectCorrespondenceType(type);
    await this.fillCorrespondencePhoneNumber(phoneNumber);
    await this.clickAddCorrespondenceMethod();
  }

  async selectRelationshipAccount(searchText: string): Promise<string> {
    const input = this.view.relationshipsAccountInput();
    await clickWhenVisible(input);
    await input.fill(searchText);
    await chooseDropdownOption(this.page, searchText, true);
    const selectedText = (await input.inputValue())?.trim() ?? searchText;
    return selectedText;
  }

  async selectDirectorAccount(searchText: string): Promise<string> {
    const input = this.view.directorAccountInput();
    await clickWhenVisible(input);
    await input.fill(searchText);
    await chooseDropdownOption(this.page, searchText, true);
    const selectedText = (await input.inputValue())?.trim() ?? searchText;
    return selectedText;
  }

  async selectRelationshipType(relationType: string): Promise<void> {
    await clickWhenVisible(this.view.relationshipsTypeInput());
    await chooseDropdownOption(this.page, relationType, true);
  }

  async selectDirectorRelation(directorRelation: string): Promise<void> {
    await clickWhenVisible(this.view.directorTypeInput());
    await chooseDropdownOption(this.page, directorRelation, true);
  }

  async clickAddRelationship() {
    await this.view.relationshipsAddButton().click();
  }

  async clickAddDirector() {
    await this.view.directorsAddButton().click();
  }

  async addRelationship(searchText: string, relationType: string): Promise<string> {
    const accountName = await this.selectRelationshipAccount(searchText);
    await this.selectRelationshipType(relationType);
    await this.clickAddRelationship();
    return accountName;
  }

  async addDirector(searchText: string, directorRelation: string): Promise<string> {
    const accountName = await this.selectDirectorAccount(searchText);
    await this.selectDirectorRelation(directorRelation);
    await this.clickAddDirector();
    return accountName;
  }

  async expandAddressesIfMoreThanFive() {
    const spinner = this.view.addressesLoadingSpinner();
    const rows = this.view.addressRows();
    const spinnerCount = await spinner.count();

    if (spinnerCount > 0) {
      await spinner.first().waitFor({ state: 'hidden' });
    }

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.addressesViewMoreButton().click();
      await expect(this.view.addressesViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.addressesViewMoreButton()).toHaveCount(0);
    }
  }

  async expandCorrespondenceMethodsIfMoreThanFive() {
    const spinner = this.view.correspondenceLoadingSpinner();
    const rows = this.view.correspondenceRows();
    const spinnerCount = await spinner.count();

    if (spinnerCount > 0) {
      await spinner.first().waitFor({ state: 'hidden' });
    }

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.correspondenceViewMoreButton().click();
      await expect(this.view.correspondenceViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.correspondenceViewMoreButton()).toHaveCount(0);
    }
  }

  async expandRelationshipsIfMoreThanFive() {
    const spinner = this.view.relationshipsLoadingSpinner();
    const rows = this.view.relationshipsRows();
    const spinnerCount = await spinner.count();

    if (spinnerCount > 0) {
      await spinner.first().waitFor({ state: 'hidden' });
    }

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.relationshipsViewMoreButton().click();
      await expect(this.view.relationshipsViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.relationshipsViewMoreButton()).toHaveCount(0);
    }
  }

  async selectPhoneConsent(value: string) {
    await this.view.phoneConsentInput().click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  async expandDirectorsIfMoreThanFive() {
    const spinner = this.view.directorsLoadingSpinner();
    const rows = this.view.relationshipsRows();
    const spinnerCount = await spinner.count();

    if (spinnerCount > 0) {
      await spinner.first().waitFor({ state: 'hidden' });
    }

    await rows.first().waitFor({ state: 'visible' });

    const rowCount = await rows.count();

    if (rowCount >= 5) {
      await this.view.relationshipsViewMoreButton().click();
      await expect(this.view.relationshipsViewLessButton()).toBeVisible();
    } else {
      await expect(this.view.relationshipsViewMoreButton()).toHaveCount(0);
    }
  }

  async selectEmailConsent(value: string) {
    await this.view.emailConsentInput().click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  async clickMarketingPreferencesSaveAndWaitForResponse() {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/graphql') && response.request().method() === 'POST'
    );

    await this.view.marketingPreferencesSaveButton().click();

    return await responsePromise;
  }

  async selectAdviser(value: string) {
    await this.view.adviserInput().click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  async clickServiceDetailsSaveAndWaitForResponse() {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/graphql') && response.request().method() === 'POST'
    );

    await this.view.serviceDetailsSaveButton().click();
    await this.view.confirmChangeButton().click(); // Click the Confirm Change button in the modal

    return await responsePromise;
  }

  async fillInitialFeeSplitToAdviser(initialFeeSplit: string) {
    await this.view.initialFeeSplit().fill(initialFeeSplit);
  }

  async fillOngoingSplitToAdviser(OngoingSplitToAdviser: string) {
    await this.view.ongoingFeeSplit().fill(OngoingSplitToAdviser);
  }

  async saveSourceDetails() {
    await this.view.sourceDetailsSaveButton().click();
  }
}

export default AccountDetailsActions;
