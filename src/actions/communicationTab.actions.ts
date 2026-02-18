import { type Page } from '@playwright/test';
import CommunicationTabPage from '../pages/communicationTab.page';

export class CommunicationTabActions {
  private readonly page: Page;
  private readonly view: CommunicationTabPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new CommunicationTabPage(page);
  }
}

export default CommunicationTabActions;
