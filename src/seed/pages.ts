import { Page } from '@playwright/test';
import { HeaderAndHamburgerPage } from '../../pages/headerAndHamburger';
import { CompliancePage } from '../../pages/compliancePage';
import { IndividualPage } from '../../pages/individualAccount';
import { FinanceTabPage } from '../../pages/financeTabPage';
import { AddPolicyModalPage } from '../../pages/addPolicyModal';
import { FeesTabPage } from '../../pages/feesTabPage';

export type PageObjects = {
  header: HeaderAndHamburgerPage;
  compliance: CompliancePage;
  individual: IndividualPage;
  finance: FinanceTabPage;
  addPolicy: AddPolicyModalPage;
  fees: FeesTabPage;
};

export function pages(page: Page): PageObjects {
  return {
    header: new HeaderAndHamburgerPage(page),
    compliance: new CompliancePage(page),
    individual: new IndividualPage(page),
    finance: new FinanceTabPage(page),
    addPolicy: new AddPolicyModalPage(page),
    fees: new FeesTabPage(page),
  };
}
