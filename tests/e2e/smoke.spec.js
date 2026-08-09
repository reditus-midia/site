const { test, expect } = require('@playwright/test');

test.describe('Smoke — páginas principais carregam', () => {
  test('home carrega, título correto e sem erros de console', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Reditus/i);
    expect(consoleErrors).toEqual([]);
  });

  test('página do mídia kit carrega e sem erros de console', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const response = await page.goto('/midia-kit-page/');
    expect(response?.ok()).toBeTruthy();
    await expect(page).toHaveTitle(/Mídia Kit/i);
    expect(consoleErrors).toEqual([]);
  });

  test('respeita prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
  });
});
