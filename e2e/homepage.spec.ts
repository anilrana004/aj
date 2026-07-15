import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads with correct title and hero', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Apriliha Singh/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Jewelry for life');
  });

  test('hero CTAs link to correct pages', async ({ page }) => {
    await page.goto('/');
    const shopBtn = page.getByRole('link', { name: 'Shop Collections' });
    await expect(shopBtn).toBeVisible();
    await expect(shopBtn).toHaveAttribute('href', '/collections');

    const designBtn = page.getByRole('link', { name: 'Design Your Own' });
    await expect(designBtn).toBeVisible();
    await expect(designBtn).toHaveAttribute('href', '/design-your-own');
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Main navigation' });
    await expect(nav.getByRole('link', { name: 'Collections' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'The Atelier' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Journal' })).toBeVisible();
    await expect(nav.getByRole('link', { name: 'Book an Appointment' })).toBeVisible();
  });

  test('newsletter section renders with email input', async ({ page }) => {
    await page.goto('/');
    const emailInput = page.getByRole('region', { name: 'Become a Member' }).getByPlaceholder('Enter your email');
    await expect(emailInput).toBeVisible();
  });

  test('search overlay opens and closes', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Search', exact: true }).click();
    await expect(page.getByPlaceholder('Search jewelry...')).toBeVisible();
    await expect(page.getByText('Popular Searches')).toBeVisible();

    await page.getByRole('button', { name: 'Close search' }).click();
    const searchOverlay = page.locator('[class*="opacity-0 pointer-events-none"]').filter({ has: page.getByPlaceholder('Search jewelry...') });
    await expect(searchOverlay).toBeVisible({ timeout: 3000 });
  });
});

test.describe('Navigation', () => {
  test('click Collections nav goes to collections page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Collections' }).click();
    await expect(page).toHaveURL(/\/collections/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('click Atelier nav goes to atelier page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'The Atelier' }).click();
    await expect(page).toHaveURL(/\/atelier/);
  });

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/collections');
    await page.getByRole('link', { name: 'Apriliha Singh - Home' }).first().click();
    await expect(page).toHaveURL('/');
  });
});
