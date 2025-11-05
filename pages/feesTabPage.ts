import { expect, type Locator, type Page } from '@playwright/test';

export class FeesTabPage {
  //This class is used to interact with the Fees tab page and the add fee pop-up modal on FADE
  readonly page: Page;
  readonly feesTabHeading: Locator;
  readonly addFeeButton: Locator;
  readonly addFeeHeading: Locator;
  readonly addFeeTypeDropdown: Locator;
  readonly addFeeTypeSelect: Locator;
  readonly addFeeSourceDropdown: Locator;
  readonly addFeeSourceSelect: Locator;
  readonly addFeeLinkToAssetsDropdown: Locator;
  readonly addFeeLinkToAssetsSelect: Locator;
  readonly addFeeLinkToContributionsDropdown: Locator;
  readonly addFeeLinkToContributionsSelect: Locator;
  readonly addFeeLinkToServiceCaseDropdown: Locator;
  readonly addFeeLinkToServiceCaseSelect: Locator;
  readonly addFeePayableToAdviser: Locator;
  readonly addFeeFixedPercentageDropdown: Locator;
  readonly addFeePercentageSelect: Locator;
  readonly addFeeCompleteButton: Locator;
  readonly amountValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.feesTabHeading = page.getByRole('heading', { name: 'Fees' });
    this.addFeeButton = page.getByRole('button', { name: 'Add Fee' });
    this.addFeeHeading = page.getByRole('heading', { name: 'Add Fee' });
    this.addFeeTypeDropdown = page.getByRole('group').locator('svg');
    this.addFeeTypeSelect = page.getByRole('option', { name: 'initial advice fee' });
    this.addFeeSourceDropdown = page
      .locator('label')
      .filter({ hasText: 'SourceSelect...' })
      .locator('svg');
    this.addFeeSourceSelect = page.getByRole('option', { name: 'asset' });
    this.addFeeLinkToAssetsDropdown = page
      .locator('label')
      .filter({ hasText: 'Link to assetsSelect...' })
      .locator('svg');
    this.addFeeLinkToAssetsSelect = page.getByRole('option', {
      name: 'ASS0018755: AAA test provider',
    });
    this.addFeeLinkToContributionsDropdown = page
      .locator('label')
      .filter({ hasText: 'Link to contributionsSelect...' })
      .locator('svg');
    this.addFeeLinkToContributionsSelect = page.getByRole('option', {
      name: 'CTB0001738: £100,000.00 -',
    });
    this.addFeeLinkToServiceCaseDropdown = page
      .locator('label')
      .filter({ hasText: 'Link to Service CaseSelect...' })
      .locator('svg');
    this.addFeeLinkToServiceCaseSelect = page.getByRole('option', {
      name: 'SER0013186: new business - 01',
    });
    this.addFeePayableToAdviser = page.getByRole('textbox', { name: 'Payable to adviser %' });
    this.addFeeFixedPercentageDropdown = page
      .locator('label')
      .filter({ hasText: 'Fixed or PercentageSelect...' })
      .locator('svg');
    this.addFeePercentageSelect = page.getByRole('option', { name: 'Percentage' });
    this.amountValue = page.getByRole('textbox', { name: 'Amount' });
    this.addFeeCompleteButton = page.getByRole('button', { name: 'Add' });
  }

  //methods
  async addNewFee(
    addFeeTypeSelect: string,
    addFeeSourceSelect: string,
    addFeeLinkToAssetsSelect: string,
    addFeeLinkToServiceCaseSelect: string,
    feePayable: string,
    addFeePercentageSelect: string,
    amountValue: string
  ) {
    await this.addFeeButton.click();
    await expect(this.addFeeHeading).toBeVisible({ timeout: 5000 });

    await this.addFeeTypeDropdown.click();
    await expect(this.page.getByRole('option', { name: addFeeTypeSelect })).toBeVisible({
      timeout: 5000,
    });
    await this.page.getByRole('option', { name: addFeeTypeSelect }).click();

    await this.addFeeSourceDropdown.click();
    await expect(this.page.getByRole('option', { name: addFeeSourceSelect })).toBeVisible({
      timeout: 5000,
    });
    await this.page.getByRole('option', { name: addFeeSourceSelect }).click();

    await this.addFeeLinkToAssetsDropdown.click();
    await expect(this.page.getByRole('option', { name: addFeeLinkToAssetsSelect })).toBeVisible({
      timeout: 5000,
    });
    await this.page.getByRole('option', { name: addFeeLinkToAssetsSelect }).click();

    await this.addFeeLinkToServiceCaseDropdown.click();
    await expect(
      this.page.getByRole('option', { name: addFeeLinkToServiceCaseSelect })
    ).toBeVisible({ timeout: 5000 });
    await this.page.getByRole('option', { name: addFeeLinkToServiceCaseSelect }).click();

    await this.addFeeFixedPercentageDropdown.click();
    await expect(this.page.getByRole('option', { name: addFeePercentageSelect })).toBeVisible({
      timeout: 5000,
    });
    await this.page.getByRole('option', { name: addFeePercentageSelect }).click();

    await this.addFeePayableToAdviser.fill(feePayable);
    await this.amountValue.fill(amountValue);
    await this.addFeeCompleteButton.click();
  }
}

export default FeesTabPage;
