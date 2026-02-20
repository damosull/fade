import { type Page } from '@playwright/test';

export class HeaderAndHamburgerPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  searchBox() {
    return this.page.getByRole('searchbox', { name: 'Search' });
  }

  headerLogo() {
    return this.page.getByRole('link', { name: 'Flying Colours Logo Flying' });
  }

  hamburgerMenu() {
    return this.page.getByRole('navigation', { name: 'Main' }).getByRole('button');
  }

  dashboard() {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  scannedDocuments() {
    return this.page.getByRole('link', { name: 'Scanned Documents (Beta)' });
  }

  incomeReconciliation() {
    return this.page.getByRole('link', { name: 'Income Reconciliation' });
  }

  providers() {
    return this.page.getByRole('link', { name: 'Providers' });
  }

  compliance() {
    return this.page.getByRole('link', { name: 'Compliance' });
  }

  offlineFactFind() {
    return this.page.getByRole('link', { name: 'Offline Fact Find (Beta)' });
  }

  valuationImports() {
    return this.page.getByRole('link', { name: 'Valuation Imports (Beta)' });
  }

  investmentAnalysis() {
    return this.page.getByRole('link', { name: 'Investment Analysis Data' });
  }

  reporting() {
    return this.page.getByRole('link', { name: 'Reporting' });
  }

  cashflow() {
    return this.page.getByRole('link', { name: 'Cashflow' });
  }

  systemAdmin() {
    return this.page.getByRole('link', { name: 'System Admin' });
  }

  secureMessages() {
    return this.page.getByRole('link', { name: 'Secure Messages' });
  }

  supportPortal() {
    return this.page.getByRole('link', { name: 'Support Portal' });
  }

  detailsTab() {
    return this.page.getByRole('link', { name: 'Details' });
  }

  casesTab() {
    return this.page.getByRole('link', { name: 'Cases' });
  }

  financesTab() {
    return this.page.getByRole('link', { name: 'Finances' });
  }

  feeTab() {
    return this.page.getByRole('link', { name: 'Fees' });
  }

  taskTab() {
    return this.page.getByRole('link', { name: 'Tasks' });
  }

  communicationTab() {
    return this.page.getByRole('link', { name: 'Communication' });
  }

  notesTab() {
    return this.page.getByRole('link', { name: 'Notes' });
  }

  documentsTab() {
    return this.page.getByRole('link', { name: 'Documents', exact: true });
  }

  objectivesTab() {
    return this.page.getByRole('link', { name: 'Objectives' });
  }

  resultsDropdown() {
    return this.page.locator('div.absolute.overflow-y-scroll');
  }

  /**
   * First account result link that contains the search text.
   * Use this instead of relying on resultsDropdown() so we wait for the actual
   * clickable result and avoid ambiguity when multiple dropdowns exist.
   */
  accountSearchResultLink(search: string) {
    return this.page.locator('a[href^="/accounts/"]').filter({ hasText: search }).first();
  }
}

export default HeaderAndHamburgerPage;
