import { test as base, expect, type Page } from '@playwright/test';
import { createTestContext, type TestContext } from '../support/testContext';

type BaseFixtures = { app: TestContext };

const baseTest = base.extend<BaseFixtures>({
  app: async ({ page }, use) => {
    const app = createTestContext(page);
    await use(app);
  },
});

export const test = Object.assign(baseTest, {
  each: <T>(data: T[]) => {
    return (
      title: string,
      body: (_fixtures: { app: TestContext; page: Page } & T) => Promise<void>
    ) => {
      data.forEach((item) => {
        const interpolatedTitle = title.replace(/\$(\w+)/g, (_, key) => {
          return (item as any)[key] ?? `$${key}`;
        });
        baseTest(interpolatedTitle, async ({ app, page }) => {
          await body({ app, page, ...(item as any) });
        });
      });
    };
  },
});

export { expect };
