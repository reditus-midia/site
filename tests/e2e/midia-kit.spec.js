const { test, expect } = require('@playwright/test');

test.describe('Mídia kit — apresentação comercial', () => {
  test('abre na tela 1 sem header, rodapé ou banner de cookies', async ({ page }) => {
    await page.goto('/midia-kit/');
    await expect(page.locator('.cover-slide h1')).toContainText('presença');
    await expect(page.locator('.presentation-dots button')).toHaveCount(10);
    await expect(page.locator('#cookie-consent')).toHaveCount(0);
    await expect(page.locator('header, footer')).toHaveCount(0);
  });

  test('navega por teclado e pelos pontos', async ({ page }) => {
    await page.goto('/midia-kit/');
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.manifesto-slide')).toBeVisible();
    await page.keyboard.press('End');
    await expect(page.locator('.contact-slide')).toBeVisible();
    await page.keyboard.press('Home');
    await expect(page.locator('.cover-slide')).toBeVisible();
    await page.getByRole('button', { name: 'Ir para tela 5' }).click();
    await expect(page.locator('.rich-slide')).toBeVisible();
  });

  test('?slide=N abre a tela e capture=1 esconde os controles', async ({ page }) => {
    await page.goto('/midia-kit/?slide=10');
    await expect(page.locator('.contact-slide')).toBeVisible();
    await page.goto('/midia-kit/?slide=9&capture=1');
    await expect(page.locator('.dashboard-slide')).toBeVisible();
    await expect(page.locator('.presentation-controls')).toHaveCount(0);
  });

  test('o olho da marca (SVG) carrega', async ({ page }) => {
    const response = await page.request.get('/reditus-eye.svg');
    expect(response.ok()).toBeTruthy();
  });
});
