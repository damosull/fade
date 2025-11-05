import { type Locator, type Page, expect } from '@playwright/test';

export class IncomeReconciliationPage {
  //variables
  readonly page: Page;
  readonly incomeReconciliationHeading: Locator;
  readonly unreconciledBankPaymentHeading: Locator;
  readonly UnreconciledDeleteButton: Locator;
  readonly unmatchedHeadings: Locator;
  readonly unreconciledRecSplitButton: Locator;
  readonly unreconciledRecAddPaymentButton: Locator;
  readonly unreconciledRecAddCsvButton: Locator;
  readonly unreconciledRecRowExpand: Locator;
  readonly unreconciledType: Locator;
  readonly unreconciledTypeSelect: Locator;
  readonly unreconciledProviderDropDown: Locator;
  readonly unreconciledProviderSelect: Locator;
  readonly unreconciledRecUpdateButton: Locator;
  readonly unreconciledRecAddfile: Locator;
  readonly unmatchViewButton: Locator;
  readonly unmatchAddStatementButton: Locator;
  readonly matchPaymentButton: Locator;
  readonly matchPaymentHeading: Locator;
  readonly matchFeeStatementHeading: Locator;
  readonly planPaymentsHeading: Locator;
  readonly matchedBankPaymentsHeading: Locator;
  readonly matchPaymentsAndExpectationButton: Locator;
  readonly matchPaymentsAndExpectationHeading: Locator;
  readonly matchBankPaymentsProviderSelect: Locator;
  readonly matchBankPaymentsProviderDrop: Locator;
  readonly runAdviserPaymentsButton: Locator;
  readonly matchedBankPaymentsFeeExpectationHeading: Locator;
  readonly typeDropdown: Locator;
  readonly typeSelect: Locator;
  readonly addStatementDateDropdown: Locator;
  readonly externalReferenceNumber: Locator;
  readonly feeStatementAmount: Locator;
  readonly policyID: Locator;
  readonly fadeTypeDropdown: Locator;
  readonly fadeType: Locator;
  readonly providerDropdown: Locator;
  readonly providerSeelct: Locator;
  readonly addFeeStatementDetailButton: Locator;
  readonly createStatementButton: Locator;
  readonly csvUploadButton: Locator;
  readonly addStatementHeading: Locator;
  readonly addStatementDatePicker: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    //Headings
    this.incomeReconciliationHeading = page.getByRole('heading', { name: 'Income Reconciliation' });
    this.unreconciledBankPaymentHeading = page.getByRole('heading', {
      name: 'Unreconciled Bank Payments',
    });
    this.unmatchedHeadings = page.getByRole('heading', { name: 'Unmatched Fee Statements' });
    this.matchPaymentHeading = page.getByRole('heading', { name: 'Match Payments and Statements' });
    this.matchFeeStatementHeading = page.getByRole('heading', { name: 'Matched Fee Statements' });
    this.planPaymentsHeading = page.getByRole('heading', { name: 'Plan Payments' });
    this.matchedBankPaymentsHeading = page.getByRole('heading', {
      name: 'Matched Bank Payments Fee',
    });
    this.matchedBankPaymentsFeeExpectationHeading = page.getByText(
      'Matched Bank Payments Fee Expectation',
      { exact: true }
    );
    this.matchPaymentsAndExpectationHeading = page.getByText('Match Payments and Expectation', {
      exact: true,
    });
    //Unreconciled Bank Payments
    this.unreconciledRecSplitButton = page.getByRole('button', { name: 'Split' });
    this.UnreconciledDeleteButton = page.locator('td:nth-child(8)');
    this.unreconciledRecAddPaymentButton = page.getByRole('button', { name: 'Add Payment' });
    this.unreconciledRecAddCsvButton = page.getByRole('button', { name: 'Add CSV file' });
    this.unreconciledRecAddfile = page.getByRole('button', {
      name: 'Drag-and-drop CSV file here,',
    });
    this.unreconciledRecRowExpand = page.locator('td.px-2.pt-3.pb-2.cursor-pointer');
    this.unreconciledType = page
      .locator('label')
      .filter({ hasText: 'Typeprovider' })
      .locator('svg');
    this.unreconciledTypeSelect = page.getByRole('option', { name: 'provider' });
    this.unreconciledProviderDropDown = page
      .locator('label')
      .filter({ hasText: 'Link to provider' })
      .locator('svg');
    this.unreconciledProviderSelect = page.getByRole('option', { name: 'Abrdn' });
    this.unreconciledRecUpdateButton = page.getByRole('button', { name: 'Update' });
    //Unmatched Fee Statements
    this.unmatchViewButton = page
      .locator('label')
      .filter({ hasText: 'Hide invoices?' })
      .locator('div');
    this.unmatchAddStatementButton = page.getByRole('button', { name: 'Add Statement' });
    //Match Payments and Statements
    this.matchPaymentButton = page.getByRole('button', { name: 'Match Payments and Statements' });
    //matched Bank Payments Fee Expectation
    this.matchBankPaymentsProviderDrop = page
      .getByRole('button', { name: 'ProviderSelect...' })
      .locator('svg');
    this.matchBankPaymentsProviderSelect = page.getByRole('option', { name: 'Abrdn', exact: true });
    this.matchPaymentsAndExpectationButton = page.getByRole('button', {
      name: 'Match Payments and Expectation',
    });
    this.runAdviserPaymentsButton = page.getByRole('button', { name: 'Run Adviser Payments' });
    this.addStatementDatePicker = page.locator('.react-datepicker__day--today');

    //Add Statement pop-up modal
    this.addStatementHeading = page.getByRole('heading', { name: 'Add Statement' });
    this.typeDropdown = page.locator('label').filter({ hasText: 'Type' }).locator('svg');
    this.typeSelect = page.getByRole('option', { name: 'provider' });
    this.addStatementDateDropdown = page
      .locator('div')
      .filter({ hasText: /^Statement Date$/ })
      .locator('svg');
    this.externalReferenceNumber = page.getByRole('textbox', { name: 'External Reference Number' });
    this.feeStatementAmount = page.getByRole('textbox', { name: 'Amount' });
    this.policyID = page.getByRole('textbox', { name: 'Policy ID' });
    this.fadeTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'FADE TypeSelect...' })
      .locator('svg');
    this.fadeType = page.getByRole('option', { name: 'initial advice fee' });
    this.providerDropdown = page
      .locator('label')
      .filter({ hasText: 'Link to providerSelect...' })
      .locator('svg');
    this.providerSeelct = page.getByRole('option', { name: 'Legals' });
    this.addFeeStatementDetailButton = page.getByRole('button', { name: 'Add' });
    this.createStatementButton = page.getByRole('button', { name: 'Create Statement' });
    this.csvUploadButton = page.getByRole('button', { name: 'CSV Upload' });
  }

  //Methods
  async incomeReconciliation() {
    await expect(this.incomeReconciliationHeading).toBeVisible({ timeout: 5000 });
    await expect(this.unreconciledBankPaymentHeading).toBeVisible({ timeout: 5000 });
    await expect(this.unmatchedHeadings).toBeVisible({ timeout: 5000 });
  }

  async unreconciledBankPaymentType(unreconciledTypeSelect: string) {
    await this.unreconciledType.click();
    await this.page.getByRole('option', { name: unreconciledTypeSelect }).click();
  }

  async unreconciledBankPaymentProvider(unreconciledProviderSelect: string) {
    await this.unreconciledProviderDropDown.click();
    await this.page.getByRole('option', { name: unreconciledProviderSelect }).click();
  }

  async matchBankPaymentsProvider(matchBankPaymentsProviderSelect: string) {
    await expect(this.matchedBankPaymentsFeeExpectationHeading).toBeVisible({ timeout: 5000 });
    await this.matchBankPaymentsProviderDrop.click();
    await this.page.getByRole('option', { name: matchBankPaymentsProviderSelect }).click();
  }

  async addStatement(
    fadeType: string,
    feeAmount: string,
    policyID: string,
    providerSelect: string,
    type: string
  ) {
    await this.typeDropdown.click();
    await this.page.getByRole('option', { name: type }).click;
    await this.addStatementDateDropdown.click();
    await this.addStatementDatePicker.click();
    await this.externalReferenceNumber.fill('test');
    await this.feeStatementAmount.fill(feeAmount);
    await this.policyID.fill(policyID);
    await this.fadeTypeDropdown.click();
    await this.page.getByRole('option', { name: fadeType }).click;
    await this.providerDropdown.click();
    await this.page.getByRole('option', { name: providerSelect }).click;
    await this.addFeeStatementDetailButton.click();
    await expect(this.createStatementButton).toBeVisible({ timeout: 5000 });
  }

  async addCsvFile() {
    await this.unreconciledRecAddCsvButton.click();
    await expect(this.unreconciledRecAddfile).toBeVisible({ timeout: 5000 });
  }
}
export default IncomeReconciliationPage;
