import { type Locator, type Page } from '@playwright/test';

export class SigninPage {
  //variables
  readonly page: Page;
  readonly microsoftSignInButton: Locator;
  readonly emailTextBox: Locator;
  readonly nextButton: Locator;
  readonly WorkEmail: Locator;
  readonly signInButton: Locator;
  readonly passwordTextBox: Locator;
  readonly yesButton: Locator;

  //constructors
  constructor(page: Page) {
    this.page = page;
    this.microsoftSignInButton = page.getByRole('button', {
      name: 'Microsoft Office Sign in with',
    });
    this.emailTextBox = page.getByRole('textbox', { name: 'Enter your email, phone, or' });
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.WorkEmail = page.getByText('Created by your IT department');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.passwordTextBox = page.getByRole('textbox', { name: 'Enter the password for' });
    this.yesButton = page.getByRole('button', { name: 'Yes' });
  }

  //methods

  async loginToFade(email: string, password: string) {
    await this.microsoftSignInButton.click();
    await this.emailTextBox.fill(email);
    await this.nextButton.click();
    await this.passwordTextBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.passwordTextBox.fill(password);
    await this.signInButton.click();
    await this.yesButton.click();
  }
}
