import { test as base, expect } from '@playwright/test';
import { createTestContext, type TestContext } from '../support/testContext';

export const test = base.extend<{ app: TestContext }>({
  app: async ({ page }, use) => {
    const app = createTestContext(page);
    await use(app);
  },
});

export { expect };
