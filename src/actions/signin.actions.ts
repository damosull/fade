import { type Page, expect } from '@playwright/test';
import SigninPage from '../pages/signin.page';

export class SigninActions {
  private readonly page: Page;
  private readonly view: SigninPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new SigninPage(page);
  }

  async loginToFade(email: string, password: string): Promise<void> {
    await expect(this.view.microsoftSignInButton()).toBeVisible();
    await this.view.microsoftSignInButton().click();

    await this.view.emailTextBox().fill(email);
    await this.view.nextButton().click();

    await this.view.passwordTextBox().waitFor({ state: 'visible', timeout: 10000 });
    await this.view.passwordTextBox().fill(password);
    await this.view.signInButton().click();

    await expect(this.view.yesButton()).toBeVisible();
    await this.view.yesButton().click();
  }
}

export default SigninActions;
