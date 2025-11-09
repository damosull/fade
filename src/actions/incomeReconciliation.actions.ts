import { type Page, expect } from '@playwright/test';
import IncomeReconciliationPage from '../pages/incomeReconciliation.page';
import { chooseDropdownOption } from '../support/helpers';
import { SHORT_WAIT } from '../support/helpers';

export class IncomeReconciliationActions {
  private readonly page: Page;
  private readonly view: IncomeReconciliationPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new IncomeReconciliationPage(page);
  }

  async verifyIncomeReconciliationHeadings(): Promise<void> {
    await expect(this.view.incomeReconciliationHeading()).toBeVisible({ timeout: SHORT_WAIT });
    await expect(this.view.unreconciledBankPaymentHeading()).toBeVisible({ timeout: SHORT_WAIT });
    await expect(this.view.unmatchedHeadings()).toBeVisible({ timeout: SHORT_WAIT });
  }

  async selectUnreconciledBankPaymentType(type: string): Promise<void> {
    await this.view.unreconciledTypeDropdown().click();
    await chooseDropdownOption(this.page, type);
  }

  async selectUnreconciledBankPaymentProvider(provider: string): Promise<void> {
    await this.view.unreconciledProviderDropdown().click();
    await chooseDropdownOption(this.page, provider);
  }

  async selectMatchBankPaymentsProvider(provider: string): Promise<void> {
    await expect(this.view.matchedBankPaymentsFeeExpectationHeading()).toBeVisible({
      timeout: SHORT_WAIT,
    });
    await this.view.matchBankPaymentsProviderDropdown().click();
    await chooseDropdownOption(this.page, provider);
  }

  async addStatement(
    fadeType: string,
    feeAmount: string,
    policyId: string,
    provider: string,
    type: string
  ): Promise<void> {
    await this.view.typeDropdown().click();
    await chooseDropdownOption(this.page, type);

    await this.view.addStatementDateDropdown().click();
    await this.view.addStatementDatePicker().click();

    await this.view.externalReferenceNumber().fill('test');
    await this.view.feeStatementAmount().fill(feeAmount);
    await this.view.policyID().fill(policyId);

    await this.view.fadeTypeDropdown().click();
    await chooseDropdownOption(this.page, fadeType);

    await this.view.providerDropdown().click();
    await chooseDropdownOption(this.page, provider);

    await this.view.addFeeStatementDetailButton().click();
    await expect(this.view.createStatementButton()).toBeVisible({ timeout: SHORT_WAIT });
  }

  async uploadCsvFile(): Promise<void> {
    await this.view.unreconciledRecAddCsvButton().click();
    await expect(this.view.unreconciledRecAddFile()).toBeVisible({ timeout: SHORT_WAIT });
  }
}

export default IncomeReconciliationActions;
