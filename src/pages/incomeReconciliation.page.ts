import { type Page } from '@playwright/test';

export class IncomeReconciliationPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  incomeReconciliationHeading() {
    return this.page.getByRole('heading', { name: 'Income Reconciliation' });
  }

  unreconciledBankPaymentHeading() {
    return this.page.getByRole('heading', { name: 'Unreconciled Bank Payments' });
  }

  unmatchedHeadings() {
    return this.page.getByRole('heading', { name: 'Unmatched Fee Statements' });
  }

  matchPaymentHeading() {
    return this.page.getByRole('heading', { name: 'Match Payments and Statements' });
  }

  matchFeeStatementHeading() {
    return this.page.getByRole('heading', { name: 'Matched Fee Statements' });
  }

  planPaymentsHeading() {
    return this.page.getByRole('heading', { name: 'Plan Payments' });
  }

  matchedBankPaymentsHeading() {
    return this.page.getByRole('heading', { name: 'Matched Bank Payments Fee' });
  }

  matchedBankPaymentsFeeExpectationHeading() {
    return this.page.getByText('Matched Bank Payments Fee Expectation', { exact: true });
  }

  matchPaymentsAndExpectationHeading() {
    return this.page.getByText('Match Payments and Expectation', { exact: true });
  }

  unreconciledRecSplitButton() {
    return this.page.getByRole('button', { name: 'Split' });
  }

  unreconciledRecAddPaymentButton() {
    return this.page.getByRole('button', { name: 'Add Payment' });
  }

  unreconciledRecAddCsvButton() {
    return this.page.getByRole('button', { name: 'Add CSV file' });
  }

  unreconciledRecAddFile() {
    return this.page.getByRole('button', { name: 'Drag-and-drop CSV file here,' });
  }

  unreconciledTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Typeprovider' }).locator('svg');
  }

  unreconciledTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  unreconciledProviderDropdown() {
    return this.page.locator('label').filter({ hasText: 'Link to provider' }).locator('svg');
  }

  unreconciledProviderOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  unreconciledRecUpdateButton() {
    return this.page.getByRole('button', { name: 'Update' });
  }

  unmatchViewButton() {
    return this.page.locator('label').filter({ hasText: 'Hide invoices?' }).locator('div');
  }

  unmatchAddStatementButton() {
    return this.page.getByRole('button', { name: 'Add Statement' });
  }

  matchPaymentButton() {
    return this.page.getByRole('button', { name: 'Match Payments and Statements' });
  }

  matchBankPaymentsProviderDropdown() {
    return this.page.getByRole('button', { name: 'ProviderSelect...' }).locator('svg');
  }

  matchBankPaymentsProviderOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  matchPaymentsAndExpectationButton() {
    return this.page.getByRole('button', { name: 'Match Payments and Expectation' });
  }

  runAdviserPaymentsButton() {
    return this.page.getByRole('button', { name: 'Run Adviser Payments' });
  }

  addStatementDatePicker() {
    return this.page.locator('.react-datepicker__day--today');
  }

  addStatementHeading() {
    return this.page.getByRole('heading', { name: 'Add Statement' });
  }

  typeDropdown() {
    return this.page.locator('label').filter({ hasText: 'Type' }).locator('svg');
  }

  typeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addStatementDateDropdown() {
    return this.page
      .locator('div')
      .filter({ hasText: /^Statement Date$/ })
      .locator('svg');
  }

  externalReferenceNumber() {
    return this.page.getByRole('textbox', { name: 'External Reference Number' });
  }

  feeStatementAmount() {
    return this.page.getByRole('textbox', { name: 'Amount' });
  }

  policyID() {
    return this.page.getByRole('textbox', { name: 'Policy ID' });
  }

  fadeTypeDropdown() {
    return this.page.locator('label').filter({ hasText: 'FADE TypeSelect...' }).locator('svg');
  }

  fadeTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  providerDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Link to providerSelect...' })
      .locator('svg');
  }

  providerOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeeStatementDetailButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }

  createStatementButton() {
    return this.page.getByRole('button', { name: 'Create Statement' });
  }

  csvUploadButton() {
    return this.page.getByRole('button', { name: 'CSV Upload' });
  }
}

export default IncomeReconciliationPage;
