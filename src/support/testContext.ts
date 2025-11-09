import type { Page } from '@playwright/test';
import * as actions from '../actions/index.actions';
import * as pages from '../pages/index.page';

export type TestContext = {
  actions: {
    header: actions.HeaderAndHamburgerActions;
    finance: actions.FinanceTabActions;
    individual: actions.IndividualActions;
    addPolicy: actions.AddPolicyModalActions;
    fees: actions.FeesTabActions;
    compliance: actions.ComplianceActions;
    provider: actions.ProviderActions;
    incomeRec: actions.IncomeReconciliationActions;
    signin: actions.SigninActions;
    assetModal: actions.AssetModalActions;
    accountCreation: actions.AccountCreationModalActions;
    accountDetails: actions.AccountDetailsActions;
  };
  pages: {
    header: pages.HeaderAndHamburgerPage;
    finance: pages.FinanceTabPage;
    individual: pages.IndividualPage;
    addPolicy: pages.AddPolicyModalPage;
    fees: pages.FeesTabPage;
    compliance: pages.CompliancePage;
    provider: pages.ProviderPage;
    incomeRec: pages.IncomeReconciliationPage;
    signin: pages.SigninPage;
    assetModal: pages.AssetModalPage;
    accountCreation: pages.AccountCreationModalPage;
    accountDetails: pages.AccountDetailsPage;
  };
};

export const createTestContext = (page: Page): TestContext => ({
  actions: {
    header: new actions.HeaderAndHamburgerActions(page),
    finance: new actions.FinanceTabActions(page),
    individual: new actions.IndividualActions(page),
    addPolicy: new actions.AddPolicyModalActions(page),
    fees: new actions.FeesTabActions(page),
    compliance: new actions.ComplianceActions(page),
    provider: new actions.ProviderActions(page),
    incomeRec: new actions.IncomeReconciliationActions(page),
    signin: new actions.SigninActions(page),
    assetModal: new actions.AssetModalActions(page),
    accountCreation: new actions.AccountCreationModalActions(page),
    accountDetails: new actions.AccountDetailsActions(page),
  },
  pages: {
    header: new pages.HeaderAndHamburgerPage(page),
    finance: new pages.FinanceTabPage(page),
    individual: new pages.IndividualPage(page),
    addPolicy: new pages.AddPolicyModalPage(page),
    fees: new pages.FeesTabPage(page),
    compliance: new pages.CompliancePage(page),
    provider: new pages.ProviderPage(page),
    incomeRec: new pages.IncomeReconciliationPage(page),
    signin: new pages.SigninPage(page),
    assetModal: new pages.AssetModalPage(page),
    accountCreation: new pages.AccountCreationModalPage(page),
    accountDetails: new pages.AccountDetailsPage(page),
  },
});
