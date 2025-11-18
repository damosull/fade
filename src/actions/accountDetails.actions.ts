import { expect, type Page } from '@playwright/test';
import AccountDetailsPage from '../pages/accountDetails.page';
import { SHORT_WAIT } from '../support/helpers';

export class AccountDetailsActions {
  private readonly page: Page;
  private readonly view: AccountDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AccountDetailsPage(page);
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
    const input = this.view.relationshipAccountInput();
    await input.click();
    await input.fill(searchText);

    const listbox = this.page.locator('[role="listbox"]').first();
    await expect(listbox).toBeVisible({ timeout: SHORT_WAIT });

    await this.page.waitForFunction(
      () => {
        // eslint-disable-next-line no-undef
        const listbox = document.querySelector('[role="listbox"]');
        if (!listbox) return false;
        const options = listbox.querySelectorAll('[role="option"]');
        return options.length > 0;
      },
      { timeout: 10000 }
    );

    const firstOption = this.page.locator('[role="listbox"] [role="option"]').first();
    const accountName = await firstOption.textContent();
    await firstOption.click();
    return accountName?.trim() || searchText;
  }

  async selectRelationshipType(relationType: string) {
    await this.view.relationshipTypeInput().click();
    await this.page.getByRole('option', { name: relationType }).click();
  }

  async clickAddRelationship() {
    await this.view.relationshipAddButton().click();
  }

  async addRelationship(searchText: string, relationType: string): Promise<string> {
    const accountName = await this.selectRelationshipAccount(searchText);
    await this.selectRelationshipType(relationType);
    await this.clickAddRelationship();
    return accountName;
  }
}

export default AccountDetailsActions;
