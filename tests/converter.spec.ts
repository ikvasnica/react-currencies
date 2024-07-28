import { test, expect } from '@playwright/test';

test.describe('converter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the currency rates table', async ({ page }) => {
    const loadingWrapper = page.locator('div#loading');

    await expect(loadingWrapper).toBeVisible();
    await expect(loadingWrapper).toBeHidden();
    await expect(page).toHaveTitle(/Currency Converter/);
    await expect(page.getByText('Daily rates')).toBeVisible();
    await expect(page.locator('tbody')).toContainText('EUR (euro)');
  });

  test('converts CZK to HUF and vice versa', async ({ page }) => {
    const amountInHUFInput = page.getByPlaceholder('Amount in HUF');
    const amountInCZKInput = page.getByPlaceholder('Amount in CZK');

    await expect(page.getByText('Pick currency')).toBeVisible();

    await amountInCZKInput.fill('150');
    await page.locator('.css-19bb58m').click();
    await page.locator('#react-select-5-input').fill('huf');
    await page.getByRole('option', { name: 'Hungary forint' }).click();

    await expect(amountInHUFInput).toHaveValue(/[0-9]/);

    await amountInHUFInput.click();

    await expect(amountInCZKInput).toHaveValue('150 CZK');

    await amountInHUFInput.fill('1500 HUF');
    await expect(amountInCZKInput).toHaveValue(/[0-9]/);
  });

  test('selected currency is always on the top of the table', async ({ page }) => {
    const firstRowLocator = page.locator('table#converter-table').locator('tr').nth(1).locator('td').nth(0);
    await firstRowLocator.waitFor();
    const originalFirstCurrencyInTable = await firstRowLocator.textContent() as string;

    await page.locator('.css-19bb58m').click();
    await page.locator('#react-select-5-input').fill('eur');
    await page.getByRole('option', { name: 'EMU euro' }).click();

    await expect(firstRowLocator).toHaveText('EUR (euro)');
    await expect(page.locator('table#converter-table').getByText(originalFirstCurrencyInTable)).toBeVisible();
  });
});

