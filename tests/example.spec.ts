/**import { test, expect } from '@playwright/test';
import * as OTPAuth from 'otpauth';

//2FA POC
test('test', async ({ page }) => {

  let totp = new OTPAuth.TOTP({
    issuer: 'Twitter',
    label: 'myTOTP',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: process.env.X_TOTP_SECRET || '',
  });

  //	otpauth://totp/Twitter:@oymworks?secret=VPHQOQE4NACZEXAZ&issuer=Twitter


  await page.goto('https://x.com/');
  await page.getByRole('button', { name: 'Accept all cookies' }).click();

  await page.getByTestId('loginButton').click();
  //await page.getByRole('textbox', { name: 'Phone, email address, or' }).click();
  await page.getByRole('textbox', { name: 'Phone, email address, or' }).fill(process.env.X_EMAIL || '');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByTestId('ocfEnterTextTextInput').click();
  await page.getByTestId('ocfEnterTextTextInput').fill('oymworks');
  await page.getByTestId('ocfEnterTextNextButton').click();
  await page.getByRole('textbox', { name: 'Password Reveal password' }).click();
  await page.getByRole('textbox', { name: 'Password Reveal password' }).fill(process.env.X_PASSWORD || '');
  await page.getByTestId('LoginForm_Login_Button').click();

  let token = totp.generate();

  await page.getByTestId('ocfEnterTextTextInput').click();
  await page.getByTestId('ocfEnterTextTextInput').fill(token);
  await page.getByTestId('ocfEnterTextNextButton').click();

});**/
