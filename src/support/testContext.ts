import type { Page } from '@playwright/test';
import * as actions from '../actions/index.actions';
import * as pages from '../pages/index.page';

const actionConstructors = {
  header: actions.HeaderAndHamburgerActions,
  finance: actions.FinanceTabActions,
  individual: actions.IndividualActions,
  addPolicy: actions.AddPolicyModalActions,
  fees: actions.FeesTabActions,
  compliance: actions.ComplianceActions,
  provider: actions.ProviderActions,
  incomeRec: actions.IncomeReconciliationActions,
  signin: actions.SigninActions,
  assetModal: actions.AssetModalActions,
} as const;

const pageConstructors = {
  header: pages.HeaderAndHamburgerPage,
  finance: pages.FinanceTabPage,
  individual: pages.IndividualPage,
  addPolicy: pages.AddPolicyModalPage,
  fees: pages.FeesTabPage,
  compliance: pages.CompliancePage,
  provider: pages.ProviderPage,
  incomeRec: pages.IncomeReconciliationPage,
  signin: pages.SigninPage,
  assetModal: pages.AssetModalPage,
  accountDetails: pages.AccountDetailsPage,
} as const;

type InstancesOf<T extends Record<string, new (..._args: any[]) => any>> = {
  [K in keyof T]: InstanceType<T[K]>;
};

export type TestContext = {
  actions: InstancesOf<typeof actionConstructors>;
  pages: InstancesOf<typeof pageConstructors>;
};

function buildInstances<T extends Record<string, new (..._args: any[]) => any>>(
  ctors: T,
  page: Page
): InstancesOf<T> {
  const entries = Object.entries(ctors).map(([key, Ctor]) => [
    key,
    new (Ctor as new (..._args: any[]) => any)(page),
  ]);

  return Object.fromEntries(entries) as InstancesOf<T>;
}

export const createTestContext = (page: Page): TestContext => ({
  actions: buildInstances(actionConstructors, page),
  pages: buildInstances(pageConstructors, page),
});
