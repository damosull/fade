import { type Page, expect } from '@playwright/test';
import HeaderAndHamburgerPage from '../pages/headerAndHamburger.page';
import { SHORT_WAIT } from '../support/helpers';

export class HeaderAndHamburgerActions {
  private readonly page: Page;
  private readonly view: HeaderAndHamburgerPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new HeaderAndHamburgerPage(page);
  }

  async searchForAccount(search: string) {
    await expect(this.view.searchBox()).toBeVisible({ timeout: SHORT_WAIT });
    await this.view.searchBox().click();
    await this.view.searchBox().fill(search);
    const result = this.page.getByRole('link', { name: search, exact: true });
    await expect(result).toBeVisible({ timeout: SHORT_WAIT });
    await result.click();
  }

  async openHamburgerMenu() {
    await this.view.hamburgerMenu().click();
  }

  async navigateToDashboard() {
    await this.view.dashboard().click();
  }

  async navigateToScannedDocuments() {
    await this.view.scannedDocuments().click();
  }

  async navigateToIncomeReconciliation() {
    await this.view.incomeReconciliation().click();
  }

  async navigateToProviders() {
    await this.view.providers().click();
  }

  async navigateToCompliance() {
    await this.view.compliance().click();
  }

  async navigateToOfflineFactFind() {
    await this.view.offlineFactFind().click();
  }

  async navigateToValuationImports() {
    await this.view.valuationImports().click();
  }

  async navigateToInvestmentAnalysis() {
    await this.view.investmentAnalysis().click();
  }

  async navigateToReporting() {
    await this.view.reporting().click();
  }

  async navigateToCashflow() {
    await this.view.cashflow().click();
  }

  async navigateToSystemAdmin() {
    await this.view.systemAdmin().click();
  }

  async navigateToSecureMessages() {
    await this.view.secureMessages().click();
  }

  async navigateToSupportPortal() {
    await this.view.supportPortal().click();
  }

  async openDetailsTab() {
    await this.view.detailsTab().click();
  }

  async openCasesTab() {
    await this.view.casesTab().click();
  }

  async openFinancesTab() {
    await this.view.financesTab().click();
  }

  async openFeeTab() {
    await this.view.feeTab().click();
  }

  async openTaskTab() {
    await this.view.taskTab().click();
  }

  async openCommunicationTab() {
    await this.view.communicationTab().click();
  }

  async openNotesTab() {
    await this.view.notesTab().click();
  }

  async openDocumentsTab() {
    await this.view.documentsTab().click();
  }

  async openObjectivesTab() {
    await this.view.objectivesTab().click();
  }
}

export default HeaderAndHamburgerActions;
