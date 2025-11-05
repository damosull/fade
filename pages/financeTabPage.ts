import { type Locator, type Page } from '@playwright/test';

export class FinanceTabPage {
  //variables
  readonly page: Page;
  readonly assetsHeading: Locator;
  readonly nonServiceableCheckBox: Locator;
  readonly addAssetButton: Locator;
  readonly contributionHeading: Locator;
  readonly withdrawalHeading: Locator;
  readonly investmentDetailHeading: Locator;
  readonly underlyingHoldingsHeading: Locator;
  readonly investmentChangesHeading: Locator;
  readonly addContributionButton: Locator;
  readonly contributionTypeDropdown: Locator;
  readonly contributionTypeSelect: Locator;
  readonly adviceTypeDropdown: Locator;
  readonly adviceTypeSelect: Locator;
  readonly estimatedAmount: Locator;
  readonly statusDropdown: Locator;
  readonly statusSelect: Locator;
  readonly frequencyDropdown: Locator;
  readonly frequencySelect: Locator;
  readonly assetDateDropdown: Locator;
  readonly saveContributionButton: Locator;
  readonly addPolicyButton: Locator;
  readonly transferFromDropdown: Locator;
  readonly transferTypeDropdown: Locator;
  readonly tranferTypeSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    //Assets
    this.assetsHeading = page.getByRole('heading', { name: 'Assets' });
    this.addAssetButton = page.getByRole('button', { name: 'Add Asset' });
    this.nonServiceableCheckBox = page.getByRole('checkbox', {
      name: 'Hide non-serviceable assets',
    });

    //Contribution
    this.contributionHeading = page.getByText('Contributions');
    this.addContributionButton = page.getByRole('button', { name: 'Add Contribution' });
    this.contributionTypeDropdown = page
      .locator('label')
      .filter({ hasText: /^TypeSelect\.\.\.$/ })
      .locator('svg');
    this.contributionTypeSelect = page.getByRole('option', { name: 'cash', exact: true });
    this.adviceTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Advice TypeSelect...' })
      .locator('svg');
    this.adviceTypeSelect = page.getByRole('option', { name: 'advised', exact: true });
    this.estimatedAmount = page.getByRole('textbox', { name: 'Estimated Amount' });
    this.statusDropdown = page
      .getByRole('dialog')
      .locator('label')
      .filter({ hasText: 'StatusSelect...' })
      .locator('svg');
    this.statusSelect = page.getByRole('option', { name: 'draft' });
    this.frequencyDropdown = page
      .locator('label')
      .filter({ hasText: 'FrequencySelect...' })
      .locator('svg');
    this.frequencySelect = page.getByRole('option', { name: 'one-off' });
    this.assetDateDropdown = page.locator(
      'div:nth-child(6) > div > .flex > .react-datepicker-wrapper > .react-datepicker__input-container > .mt-\\[0\\.1rem\\]'
    );
    this.transferFromDropdown = page
      .locator('label')
      .filter({ hasText: 'Transferred FromSelect...' })
      .locator('svg');
    this.transferTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Transfer TypeSelect...' })
      .locator('svg');
    this.tranferTypeSelect = page.getByRole('option', { name: 'in specie' });
    this.saveContributionButton = page.getByRole('button', { name: 'Add' });
    //withdrawal
    this.withdrawalHeading = page.getByText('Withdrawals');
    this.investmentDetailHeading = page.getByText('Investment Details');
    this.underlyingHoldingsHeading = page.getByText('Underlying Holdings');
    this.investmentChangesHeading = page.getByText('Investment Changes');
    this.addPolicyButton = page.getByRole('button', { name: 'Add Policy' });
  }

  //methods
  async expandAsset(assetName: string) {
    await this.page.getByRole('cell', { name: assetName }).locator('svg').click();
  }
  async addContribution(
    contributionTypeSelect: string,
    estimatedAmount: string,
    statusSelect: string,
    frequencySelect: string
  ) {
    await this.contributionTypeDropdown.click();
    await this.page.getByRole('option', { name: contributionTypeSelect, exact: true }).click();
    await this.estimatedAmount.fill(estimatedAmount);
    await this.statusDropdown.click();
    await this.page.getByRole('option', { name: statusSelect }).click();
    await this.frequencyDropdown.click();
    await this.page.getByRole('option', { name: frequencySelect }).click();
  }

  async cashTransferContribution(tranferTypeSelect: string) {
    await this.transferFromDropdown.click();
    await this.transferTypeDropdown.click();
    await this.page.getByRole('option', { name: tranferTypeSelect }).click();
  }

  async saveContribution() {
    await this.saveContributionButton.click();
  }
}

export default FinanceTabPage;
