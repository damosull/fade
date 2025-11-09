import { type Page } from '@playwright/test';

export class SigninPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  microsoftSignInButton() {
    return this.page.getByRole('button', {
      name: 'Microsoft Office Sign in with',
    });
  }

  emailTextBox() {
    return this.page.getByRole('textbox', { name: 'Enter your email, phone, or' });
  }

  nextButton() {
    return this.page.getByRole('button', { name: 'Next' });
  }

  workEmail() {
    return this.page.getByText('Created by your IT department');
  }

  signInButton() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  passwordTextBox() {
    return this.page.getByRole('textbox', { name: 'Enter the password for' });
  }

  yesButton() {
    return this.page.getByRole('button', { name: 'Yes' });
  }
}

export default SigninPage;
