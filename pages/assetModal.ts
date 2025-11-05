import { type Locator, type Page, expect } from '@playwright/test';

export class AssetModalPage {
  //variables
  readonly page: Page;
  readonly addAssetHeading: Locator;
  readonly selectAssetType: Locator;
  readonly assetSubTypeDropdown: Locator;
  readonly selectAssetSubType: Locator;
  readonly assetTypeDropdown: Locator;
  readonly addAssetSaveButton: Locator;
  readonly pensionTypeDropdown: Locator;
  readonly selectPensionType: Locator;
  readonly heldOnPlatofrmCheckBox: Locator;
  readonly agencyStatusDropdown: Locator;
  readonly agencyStatusSelect: Locator;
  readonly agencyStatusDateDropdown: Locator;
  readonly agencyStatusDatePicker: Locator;
  readonly policyName: Locator;
  readonly providerSelect: Locator;
  readonly wrapId: Locator;
  readonly policyStartDateDropdown: Locator;
  readonly fromDatePicker: Locator;
  readonly providerDropDown: Locator;
  readonly policyNumber: Locator;
  readonly secondaryPolicyNumber: Locator;
  readonly normalRetirementDateDropdown: Locator;
  readonly policyStatusDropdown: Locator;
  readonly policyStatusSelect: Locator;
  readonly policyStatusDateDropdown: Locator;
  readonly crystallised: Locator;
  readonly membershipStatusDropdown: Locator;
  readonly membershipStatusSelect: Locator;
  readonly employmentDropdown: Locator;
  readonly drawdownStatusDropdown: Locator;
  readonly drawdownStatusSelect: Locator;
  readonly addValuationButton: Locator;
  readonly assetValuationHeading: Locator;
  readonly assetValue: Locator;
  readonly assetValuationDateDropdown: Locator;
  readonly assetValuationDatePicker: Locator;
  readonly saveValuationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    //Add Asset
    this.addAssetHeading = page.getByRole('heading', { name: 'Add Asset' });
    this.assetTypeDropdown = page.getByRole('group', { name: 'Overview' }).locator('svg');
    this.selectAssetType = page.getByRole('option', { name: 'pension' });
    this.assetSubTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Sub TypeSelect' })
      .locator('svg');
    this.selectAssetSubType = page.getByRole('option', { name: 'occupational' });
    this.pensionTypeDropdown = page
      .locator('label')
      .filter({ hasText: 'Pension TypeSelect' })
      .locator('svg');
    this.selectPensionType = page.getByRole('option', { name: 'workplace pension' });
    this.addAssetSaveButton = page.getByRole('button', { name: 'Add Asset' });
    this.heldOnPlatofrmCheckBox = page.getByRole('checkbox', {
      name: 'Is asset held on a platform',
    });
    this.agencyStatusDropdown = page
      .locator('label')
      .filter({ hasText: 'Agency StatusSelect' })
      .locator('svg');
    this.agencyStatusSelect = page.getByRole('option', { name: 'under agency', exact: true });
    this.agencyStatusDateDropdown = page
      .locator('div')
      .filter({ hasText: /^Agency Status Date$/ })
      .locator('svg');
    this.agencyStatusDatePicker = page.locator('.react-datepicker__day--today');
    this.policyName = page.getByRole('textbox', { name: 'Policy Name' });
    this.providerDropDown = page
      .locator('label')
      .filter({ hasText: 'ProviderSelect...' })
      .locator('svg');
    this.providerSelect = page.getByRole('option', { name: 'Abrdn' });
    this.wrapId = page.getByRole('textbox', { name: 'Wrap ID' });
    this.policyStartDateDropdown = page
      .locator('div')
      .filter({ hasText: /^Start Date$/ })
      .locator('svg');
    this.fromDatePicker = page.locator('.react-datepicker__day--today');
    this.policyNumber = page.getByRole('textbox', { name: 'Policy Number', exact: true });
    this.secondaryPolicyNumber = page.getByRole('textbox', { name: 'Secondary Policy Number' });
    this.normalRetirementDateDropdown = page
      .locator('div')
      .filter({ hasText: /^Normal Retirement Date$/ })
      .locator('svg');
    this.policyStatusDropdown = page
      .locator('label')
      .filter({ hasText: 'Policy StatusSelect...' })
      .locator('svg');
    this.policyStatusSelect = page.getByRole('option', { name: 'submitted' });
    this.policyStatusDateDropdown = page.locator(
      'div:nth-child(9) > div > .flex > .react-datepicker-wrapper > .react-datepicker__input-container > .mt-\\[0\\.1rem\\] > path:nth-child(2)'
    );
    this.crystallised = page.getByRole('textbox', { name: 'Crystallised' });
    this.membershipStatusDropdown = page
      .locator('label')
      .filter({ hasText: 'Membership StatusSelect...' })
      .locator('svg');
    this.membershipStatusSelect = page.getByRole('option', { name: 'active member - accruing' });
    this.employmentDropdown = page
      .locator('label')
      .filter({ hasText: 'EmploymentSelect...' })
      .locator('svg');
    this.drawdownStatusDropdown = page
      .locator('label')
      .filter({ hasText: 'Drawdown StatusSelect...' })
      .locator('svg');
    this.drawdownStatusSelect = page.getByRole('option', { name: 'not in drawdown' });
    //Valuation
    this.addValuationButton = page.getByRole('button', { name: 'Valuations' });
    this.assetValuationHeading = page.getByRole('heading', { name: 'Asset Valuations' });
    this.assetValue = page.getByRole('textbox', { name: 'Value' });
    this.assetValuationDateDropdown = page
      .getByRole('group', { name: 'Add New Valuation' })
      .locator('svg');
    this.assetValuationDatePicker = page.locator('.react-datepicker__day--today');
    this.saveValuationButton = page.getByRole('button', { name: 'Add' });
  }

  async addAssetOverview(selectAssetType: string) {
    await expect(this.addAssetHeading).toBeVisible({ timeout: 5000 });
    await this.assetTypeDropdown.click();
    await this.page.getByRole('option', { name: selectAssetType }).click();
  }

  async addAssetSubType(selectAssetSubType: string) {
    await this.assetSubTypeDropdown.click();
    await this.page.getByRole('option', { name: selectAssetSubType }).click();
  }

  async addAssetAgencyStatus(agencyStatusSelect: string) {
    await this.agencyStatusDropdown.click();
    await this.page.getByRole('option', { name: agencyStatusSelect, exact: true }).click();
    await this.agencyStatusDateDropdown.click();
    await this.agencyStatusDatePicker.click();
  }

  async addAssetPolicyDetails(
    policyName: string,
    providerSelect: string,
    policyNumber: string,
    policyStatusSelect: string
  ) {
    await this.policyName.fill(policyName);
    await this.providerDropDown.click();
    await this.page.getByRole('option', { name: providerSelect }).click();
    await this.policyNumber.fill(policyNumber);
    await this.policyStatusDropdown.click();
    await this.page.getByRole('option', { name: policyStatusSelect }).click();
  }

  async saveAsset() {
    await this.addAssetSaveButton.click();
  }

  async addAssetValuation(assetValue: string) {
    await this.assetValue.fill(assetValue);
    await this.assetValuationDateDropdown.click();
    await this.assetValuationDatePicker.click();
  }

  // Helper method to select a specific date
  private async selectDate(datePickerDropdown: Locator, daysOffset: number = 0) {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Click the date picker to open it
    await datePickerDropdown.click();

    // Wait for the date picker to be visible
    await this.page.locator('.react-datepicker').waitFor();

    // Format the date string to match the aria-label format
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[month];

    const daySuffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
          ? 'nd'
          : day % 10 === 3 && day !== 13
            ? 'rd'
            : 'th';

    const formattedDate = `Choose ${dayName}, ${monthName} ${day}${daySuffix}, ${year}`;

    // Wait for the specific date to be available and click it
    const dateSelector = this.page.locator(`.react-datepicker__day[aria-label="${formattedDate}"]`);
    await dateSelector.waitFor({ state: 'visible', timeout: 6000 });
    await dateSelector.click();
  }

  async addAssetValuationDate(daysOffset: number = 0) {
    await this.selectDate(this.assetValuationDateDropdown, daysOffset);
  }

  async saveAssetValuation() {
    await this.saveValuationButton.click();
  }
}
export default AssetModalPage;
