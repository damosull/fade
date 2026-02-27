import type { Page } from '@playwright/test';
import * as actions from '../actions/index.actions';
import * as pages from '../pages/index.page';

/**
 * A map of all Action classes in the framework.
 *
 * Key = the name we will use to access the action in tests.
 * Value = the class that will be instantiated.
 *
 * Example usage in a test:
 *   testContext.actions.finance.doSomething();
 */
const actionConstructors = {
  header: actions.HeaderAndHamburgerActions,
  finance: actions.FinanceTabActions,
  account: actions.AccountActions,
  addPolicy: actions.AddPolicyModalActions,
  addTaskModal: actions.AddTaskModalActions,
  fees: actions.FeesTabActions,
  compliance: actions.ComplianceActions,
  provider: actions.ProviderActions,
  incomeRec: actions.IncomeReconciliationActions,
  signin: actions.SigninActions,
  assetModal: actions.AssetModalActions,
  accountDetails: actions.AccountDetailsActions,
  withdrawalModal: actions.WithdrawalModalActions,
  addEmploymentModal: actions.AddEmploymentModalActions,
  contributionModal: actions.ContributionModalActions,
  runNewAmlCheckModal: actions.RunNewAmlCheckModalActions,
  tasks: actions.TasksTabActions,
  communication: actions.CommunicationTabActions,
  addCommunicationModal: actions.AddCommunicationModalActions,
  addNoteModal: actions.AddNoteModalActions,
  addDocumentModal: actions.AddDocumentModalActions,
  documentsTab: actions.DocumentsTabActions,
  notes: actions.NotesTabActions,
} as const;

/**
 * Same idea as actionConstructors, but for all Page Object classes.
 *
 * These classes only hold locators—no logic.
 */
const pageConstructors = {
  header: pages.HeaderAndHamburgerPage,
  finance: pages.FinanceTabPage,
  account: pages.AccountPage,
  addPolicy: pages.AddPolicyModalPage,
  addTaskModal: pages.AddTaskModalPage,
  fees: pages.FeesTabPage,
  compliance: pages.CompliancePage,
  provider: pages.ProviderPage,
  incomeRec: pages.IncomeReconciliationPage,
  signin: pages.SigninPage,
  assetModal: pages.AssetModalPage,
  accountDetails: pages.AccountDetailsPage,
  withdrawalModal: pages.WithdrawalModalPage,
  addEmploymentModal: pages.AddEmploymentModalPage,
  contributionModal: pages.ContributionModalPage,
  runNewAmlCheckModal: pages.RunNewAmlCheckModalPage,
  tasks: pages.TasksTabPage,
  communication: pages.CommunicationTabPage,
  addCommunicationModal: pages.AddCommunicationModalPage,
  notes: pages.NotesTabPage,
  addNoteModal: pages.AddNoteModalPage,
  documents: pages.documentsTab,
  addDocumentModal: pages.AddDocumentModalPage,
} as const;

/**
 * Utility type:
 * Converts a map of class constructors into a map of *actual instances*.
 *
 * Example:
 * Input  → { signin: SigninActions }
 * Output → { signin: SigninActionsInstance }
 */
type InstancesOf<T extends Record<string, new (..._args: any[]) => any>> = {
  [K in keyof T]: InstanceType<T[K]>;
};

export type TestContext = {
  /** All Action class instances (helpers that perform UI behaviour). */
  actions: InstancesOf<typeof actionConstructors>;
  /** All Page class instances (locators only). */
  pages: InstancesOf<typeof pageConstructors>;
};

/**
 * Builds an object containing instantiated classes.
 *
 * For every entry in the constructors map:
 *   { key: Class } → { key: new Class(page) }
 *
 * This ensures each Action/Page class receives the Playwright `page`
 * instance so it can interact with the browser.
 */
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

/**
 * Creates a fully prepared TestContext object for each test.
 *
 * This gives test files easy access to:
 *   testContext.actions.<actionName>
 *   testContext.pages.<pageName>
 *
 * Keeps the test files clean and avoids repetitive `new SomeClass(page)` calls.
 */
export const createTestContext = (page: Page): TestContext => ({
  actions: buildInstances(actionConstructors, page),
  pages: buildInstances(pageConstructors, page),
});
