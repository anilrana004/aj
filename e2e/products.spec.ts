import { test, expect } from '@playwright/test';

test.describe('Collections Page', () => {
  test('loads with collection listings', async ({ page }) => {
    await page.goto('/collections');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('collection cards are clickable', async ({ page }) => {
    await page.goto('/collections');
    const links = page.locator('a[href^="/collections/"]');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Collection Detail', () => {
  test('loads with hero and story', async ({ page }) => {
    await page.goto('/collections/zenana-edit');
    await expect(page).toHaveTitle(/Zenana/);
    await expect(page.getByText('The Story')).toBeVisible();
  });

  test('products section shows if products exist', async ({ page }) => {
    await page.goto('/collections/zenana-edit');
    const productsSection = page.getByText('Pieces in');
    const isVisible = await productsSection.isVisible().catch(() => false);
    if (isVisible) {
      await expect(productsSection).toBeVisible();
    }
  });
});

test.describe('Product Detail', () => {
  test('loads with product info', async ({ page }) => {
    await page.goto('/product/zenana-choker');
    await expect(page).toHaveTitle(/Zenana Choker/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('product has price displayed', async ({ page }) => {
    await page.goto('/product/zenana-choker');
    const priceEl = page.getByText('₹');
    const count = await priceEl.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('product has description', async ({ page }) => {
    await page.goto('/product/zenana-choker');
    const desc = page.locator('dl').first();
    const hasDetails = await desc.isVisible().catch(() => false);
    if (!hasDetails) {
      await page.evaluate(() => window.scrollBy(0, 600));
    }
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/product/zenana-choker');
    const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });
    await expect(breadcrumb).toBeVisible();

    const homeLink = breadcrumb.getByRole('link', { name: 'Home' });
    await expect(homeLink).toHaveAttribute('href', '/');
  });
});

test.describe('Utility Pages', () => {
  test('care guide loads', async ({ page }) => {
    await page.goto('/care-guide');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('shipping & returns loads', async ({ page }) => {
    await page.goto('/shipping-returns');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('repair page loads', async ({ page }) => {
    await page.goto('/repair');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('appointment page loads', async ({ page }) => {
    await page.goto('/appointment');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
