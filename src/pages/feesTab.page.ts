import { type Page } from '@playwright/test';

export class FeesTabPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  feesTabHeading() {
    return this.page.getByRole('heading', { name: 'Fees' });
  }

  addFeeButton() {
    return this.page.getByRole('button', { name: 'Add Fee' });
  }

  addFeeHeading() {
    return this.page.getByRole('heading', { name: 'Add Fee' });
  }

  addFeeTypeDropdown() {
    return this.page.getByRole('group').locator('svg');
  }

  addFeeTypeOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeeSourceDropdown() {
    return this.page.locator('label').filter({ hasText: 'SourceSelect...' }).locator('svg');
  }

  addFeeSourceOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeeLinkToAssetsDropdown() {
    return this.page.locator('label').filter({ hasText: 'Link to assetsSelect...' }).locator('svg');
  }

  addFeeLinkToAssetsOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeeLinkToContributionsDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Link to contributionsSelect...' })
      .locator('svg');
  }

  addFeeLinkToContributionsOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeeLinkToServiceCaseDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Link to Service CaseSelect...' })
      .locator('svg');
  }

  addFeeLinkToServiceCaseOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  addFeePayableToAdviser() {
    return this.page.getByRole('textbox', { name: 'Payable to adviser %' });
  }

  addFeeFixedPercentageDropdown() {
    return this.page
      .locator('label')
      .filter({ hasText: 'Fixed or PercentageSelect...' })
      .locator('svg');
  }

  addFeePercentageOption(name: string) {
    return this.page.getByRole('option', { name });
  }

  amountValue() {
    return this.page.getByRole('textbox', { name: 'Amount' });
  }

  addFeeCompleteButton() {
    return this.page.getByRole('button', { name: 'Add' });
  }
}

export default FeesTabPage;
