import { test, expect } from '@playwright/test';

test.describe('Auth Flow', () => {
  test('signup page renders form fields', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Create Account');
    await expect(page.locator('#signup-name')).toBeVisible();
    await expect(page.locator('#signup-email')).toBeVisible();
  });

  test('signup links to login', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('link', { name: 'Log In' })).toHaveAttribute('href', '/login');
  });

  test('login page renders form fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Welcome Back');
    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();
  });

  test('login links to signup and forgot password', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('link', { name: 'Create Account' })).toHaveAttribute('href', '/signup');
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toHaveAttribute('href', '/forgot-password');
  });

  test('forgot password page renders', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('#fp-email')).toBeVisible();
  });

  test('can complete signup flow', async ({ page }) => {
    await page.goto('/signup');
    await page.locator('#signup-name').fill('Test User');
    await page.locator('#signup-email').fill(`test-${Date.now()}@example.com`);
    await page.locator('#signup-password').fill('TestPassword123!');
    await page.getByRole('button', { name: 'Create Account' }).click();

    await expect(page).toHaveURL(/\/account\/orders/, { timeout: 10000 });
  });

  test('login with wrong password shows error', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#login-email').fill('nonexistent@example.com');
    await page.locator('#login-password').fill('WrongPassword123!');
    await page.getByRole('button', { name: 'Log In' }).click();

    await expect(page.getByText(/don't match|Something went wrong/)).toBeVisible({ timeout: 5000 });
  });
});
