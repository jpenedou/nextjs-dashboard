import { test, expect } from '@playwright/test';

test('LoginLogout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).press('ArrowDown');
  await page.getByRole('textbox', { name: 'Email' }).fill('user@nextmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.locator('div').filter({ hasText: /^Collected$/ }).click();
  await page.locator('div').filter({ hasText: /^Pending$/ }).click();
  await page.getByRole('heading', { name: 'Total Invoices' }).click();
  await page.getByRole('heading', { name: 'Total Customers' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});
