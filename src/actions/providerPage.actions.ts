import { type Page, expect } from '@playwright/test';
import ProviderPage from '../pages/providerPage.page';
import { chooseDropdownOption } from '../support/helpers';

export class ProviderActions {
  private readonly page: Page;
  private readonly view: ProviderPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new ProviderPage(page);
  }

  async assertProviderPage(): Promise<void> {
    await expect(this.view.providerHeading()).toBeVisible();
    await expect(this.view.providerSearchHeading()).toBeVisible();
  }

  async addNewProvider(name: string): Promise<void> {
    await this.view.providerAddButton().click();
    await expect(this.view.addProviderHeading()).toBeVisible();
    await this.view.addProviderName().fill(name);
    await this.view.saveAddProviderButton().click();
    await expect(this.view.addProviderHeading()).toBeHidden();
  }

  async providerDetails(searchText: string): Promise<void> {
    await this.view.providerSearchBox().click();
    await this.view.providerSearchBox().fill(searchText);
  }

  async selectProvider(providerName: string): Promise<void> {
    await this.view.providerSelectLink(providerName).click();
  }

  async providerAdminTab(): Promise<void> {
    await this.view.adminTab().click();
  }

  async createProviderType(
    typeName: string,
    description: string,
    exactMatch = false
  ): Promise<void> {
    await this.view.typeDropdown().click();
    await chooseDropdownOption(this.page, typeName, exactMatch);
    await this.view.providerTypeDescription().click();
    await this.view.providerTypeDescription().fill(description);
    await this.view.addProviderDescriptionButton(typeName).click();
  }

  async createBankPaymentRef(ref: string): Promise<void> {
    await expect(this.view.bankPaymentRefHeading()).toBeVisible();
    await this.view.bankPaymentRef().fill(ref);
    await this.view.addBankPaymentRefButton().click();
  }

  async regularFeePayment(ongoing: string, renewal: string, fundBased: string): Promise<void> {
    await this.view.ongoingAdviceFeeDropdown().click();
    await chooseDropdownOption(this.page, ongoing);

    await this.view.renewalCommDropdown().click();
    await chooseDropdownOption(this.page, renewal);

    await this.view.fundBasedCommPaymentDropdown().click();
    await chooseDropdownOption(this.page, fundBased);
  }
}

export default ProviderActions;
