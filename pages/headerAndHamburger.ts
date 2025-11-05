import { type Locator, type Page, expect } from '@playwright/test';

export class HeaderAndHamburgerPage {
  //variables
  readonly page: Page;
  readonly searchBox: Locator;
  readonly headerLogo: Locator;
  readonly hamburgerMenu: Locator;
  readonly dashboard: Locator;
  readonly scannedDocuments: Locator;
  readonly incomeReconciliation: Locator;
  readonly providers: Locator;
  readonly compliance: Locator;
  readonly offlineFactFind: Locator;
  readonly valuationImports: Locator;
  readonly investmentAnalysis: Locator;
  readonly reporting: Locator;
  readonly cashflow: Locator;
  readonly systemAdmin: Locator;
  readonly secureMessages: Locator;
  readonly supportPortal: Locator;
  readonly detailsTab: Locator;
  readonly casesTab: Locator;
  readonly financesTab: Locator;
  readonly feeTab: Locator;
  readonly taskTab: Locator;
  readonly communicationTab: Locator;
  readonly notesTab: Locator;
  readonly documentsTab: Locator;
  readonly objectivesTab: Locator;

  //constructor
  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole('searchbox', { name: 'Search' });
    this.headerLogo = page.getByRole('link', { name: 'Flying Colours Logo Flying' });
    this.hamburgerMenu = page.getByRole('navigation', { name: 'Main' }).getByRole('button');
    this.dashboard = page.getByRole('link', { name: 'Dashboard' });
    this.scannedDocuments = page.getByRole('link', { name: 'Scanned Documents (Beta)' });
    this.incomeReconciliation = page.getByRole('link', { name: 'Income Reconciliation' });
    this.providers = page.getByRole('link', { name: 'Providers' });
    this.compliance = page.getByRole('link', { name: 'Compliance' });
    this.offlineFactFind = page.getByRole('link', { name: 'Offline Fact Find (Beta)' });
    this.valuationImports = page.getByRole('link', { name: 'Valuation Imports (Beta)' });
    this.investmentAnalysis = page.getByRole('link', { name: 'Investment Analysis Data' });
    this.reporting = page.getByRole('link', { name: 'Reporting' });
    this.cashflow = page.getByRole('link', { name: 'Cashflow' });
    this.systemAdmin = page.getByRole('link', { name: 'System Admin' });
    this.secureMessages = page.getByRole('link', { name: 'Secure Messages' });
    this.supportPortal = page.getByRole('link', { name: 'Support Portal' });
    this.detailsTab = page.getByRole('link', { name: 'Details' });
    this.casesTab = page.getByRole('link', { name: 'Cases' });
    this.financesTab = page.getByRole('link', { name: 'Finances' });
    this.feeTab = page.getByRole('link', { name: 'Fees' });
    this.taskTab = page.getByRole('link', { name: 'Tasks' });
    this.communicationTab = page.getByRole('link', { name: 'Communication' });
    this.notesTab = page.getByRole('link', { name: 'Notes' });
    this.documentsTab = page.getByRole('link', { name: 'Documents', exact: true });
    this.objectivesTab = page.getByRole('link', { name: 'Objectives' });
  }

  //Methods
  async clickOnSearchBox(search: string) {
    await expect(this.searchBox).toBeVisible({ timeout: 5000 });
    await this.searchBox.click();
    await this.searchBox.fill(search);
    const result = this.page.getByRole('link', { name: search, exact: true });
    await expect(result).toBeVisible({ timeout: 5000 });
    await result.click();
  }

  //Hamburger Menu options
  async clickOnHamburgerMenu() {
    await this.hamburgerMenu.click();
  }

  async clickOnDashboard() {
    await this.dashboard.click();
  }

  async clickOnScannedDocuments() {
    await this.scannedDocuments.click();
  }

  async clickOnIncomeReconciliation() {
    await this.incomeReconciliation.click();
  }

  async clickOnProviders() {
    await this.providers.click();
  }

  async clickOnCompliance() {
    await this.compliance.click();
  }

  async clickOnOfflineFactFind() {
    await this.offlineFactFind.click();
  }

  async clickOnValuationImports() {
    await this.valuationImports.click();
  }

  async clickOnInvestmentAnalysis() {
    await this.investmentAnalysis.click();
  }

  async clickOnReporting() {
    await this.reporting.click();
  }

  async clickOnCashflow() {
    await this.cashflow.click();
  }

  async clickOnSystemAdmin() {
    await this.systemAdmin.click();
  }

  async clickOnSecureMessages() {
    await this.secureMessages.click();
  }

  async clickOnSupportPortal() {
    await this.supportPortal.click();
  }

  //Account Menu Tabs
  async clickOnDetailsTab() {
    await this.detailsTab.click();
  }
  async clickOnCasesTab() {
    await this.casesTab.click();
  }
  async clickOnFinancesTab() {
    await this.financesTab.click();
  }
  async clickOnFeeTab() {
    await this.feeTab.click();
  }

  async clickOnTaskTab() {
    await this.taskTab.click();
  }

  async clickOnCommunicationTab() {
    await this.communicationTab.click();
  }

  async clickOnNotesTab() {
    await this.notesTab.click();
  }

  async clickOnDocumentsTab() {
    await this.documentsTab.click();
  }

  async clickOnObjectivesTab() {
    await this.objectivesTab.click();
  }
}
export default HeaderAndHamburgerPage;
