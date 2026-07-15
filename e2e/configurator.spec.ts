import { test, expect } from '@playwright/test';

test.describe('Configurator Entry', () => {
  test('loads with correct heading and product type cards', async ({ page }) => {
    await page.goto('/design-your-own');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Design Your Own');

    await expect(page.getByText('Necklace (Maala)')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Bracelet' })).toBeVisible();
    await expect(page.getByText('Mala (Prayer Beads)')).toBeVisible();
  });

  test('product cards link to correct builder pages', async ({ page }) => {
    await page.goto('/design-your-own');

    const links = page.locator('a[href^="/design-your-own/"]');
    await expect(links.filter({ hasText: 'Necklace' }).first()).toHaveAttribute('href', '/design-your-own/necklace');
    await expect(links.filter({ hasText: 'Bracelet' }).first()).toHaveAttribute('href', '/design-your-own/bracelet');
    await expect(links.filter({ hasText: 'Mala' }).first()).toHaveAttribute('href', '/design-your-own/mala');
  });

  test('how-it-works steps are shown', async ({ page }) => {
    await page.goto('/design-your-own');
    await expect(page.getByText('Choose', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('See', { exact: false }).first()).toBeVisible();
    await expect(page.getByText('Own', { exact: false }).first()).toBeVisible();
  });
});

test.describe('Necklace Configurator', () => {
  test('loads with step navigation and first slot active', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    await expect(page.getByRole('heading', { name: /The Foundation/ })).toBeVisible();

    const progressBar = page.getByRole('navigation', { name: 'Configurator progress' });
    await expect(progressBar).toBeVisible();

    await expect(page.getByText('Step 1 of')).toBeVisible();
  });

  test('part cards are displayed and selectable', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    const partCards = page.getByRole('button', { name: /Select/ });
    const count = await partCards.count();
    expect(count).toBeGreaterThanOrEqual(2);

    await partCards.first().click();
    await expect(partCards.first()).toHaveAttribute('aria-pressed', 'true');
  });

  test('selecting a part shows it in the side panel', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    const firstPart = page.getByRole('button', { name: /Select/ }).first();
    await firstPart.click();

    const panel = page.getByRole('heading', { name: 'Your Piece' }).first();
    await expect(panel).toBeVisible();
  });

  test('can navigate through steps with Continue/Back', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    const firstPart = page.getByRole('button', { name: /Select/ }).first();
    await firstPart.click();

    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Step 2 of')).toBeVisible();

    await page.getByRole('button', { name: 'Back' }).click();
    await expect(page.getByText('Step 1 of')).toBeVisible();
  });

  test('last step shows Book a Consultation instead of Continue', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    const slotCount = await page.getByRole('navigation', { name: 'Configurator progress' }).getByRole('button').count();

    for (let i = 0; i < slotCount; i++) {
      const cards = page.getByRole('button', { name: /Select/ });
      if (await cards.count() > 0) {
        await cards.first().click();
      }
      const continueBtn = page.getByRole('button', { name: 'Continue' });
      if (await continueBtn.isVisible().catch(() => false)) {
        await continueBtn.click();
      }
    }

    await expect(page.getByRole('link', { name: 'Book a Consultation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book a Consultation' })).toHaveAttribute('href', '/appointment');
  });

  test('part cards show price or Included text', async ({ page }) => {
    await page.goto('/design-your-own/necklace');

    const cards = page.getByRole('button', { name: /Select/ });
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);
      const priceVisible = await card.getByText('Included').isVisible().catch(() => false);
      const rupeeVisible = await card.getByText('₹').isVisible().catch(() => false);
      expect(priceVisible || rupeeVisible).toBeTruthy();
    }
  });
});

test.describe('Bracelet Configurator', () => {
  test('loads with Foundation as first step', async ({ page }) => {
    await page.goto('/design-your-own/bracelet');
    await expect(page.getByRole('heading', { name: /The Foundation/ })).toBeVisible();
  });
});

test.describe('Mala Configurator', () => {
  test('loads with Beads as first step', async ({ page }) => {
    await page.goto('/design-your-own/mala');
    await expect(page.getByRole('heading', { name: /The Beads/ })).toBeVisible();
  });
});
