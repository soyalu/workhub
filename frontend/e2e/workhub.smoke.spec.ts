import { expect, test } from '@playwright/test';

test('首页的冒险场景及六个功能入口可访问', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '今日 · 主线任务' })).toBeVisible();
  const map = page.getByRole('region', { name: '冒险地图导航' });
  await expect(map.locator('img.adventure-scene')).toBeVisible();
  await expect(map).toHaveClass(/is-raster-art/);
  const mapImage = map.locator('img.adventure-scene');
  await expect(mapImage).toHaveAttribute('src', '/art/home-map.webp');
  await expect.poll(() => mapImage.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(1200);
  const traveler = page.locator('img.traveler-portrait');
  await expect(traveler).toBeVisible();
  await expect.poll(() => traveler.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(700);
  await expect(page.locator('.sidebar-scenery')).toHaveCSS('background-image', /sidebar-night\.webp/);
  await expect(map.locator('a.map-node')).toHaveCount(6);
  await expect(map.locator('a.map-node .map-node-medallion')).toHaveCount(6);
  await expect(map.locator('a.map-node .map-node-arrow')).toHaveCount(6);
  await expect(map.getByRole('link', { name: /项目中心/ })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('home-desktop.png'), fullPage: true });
  await map.getByRole('link', { name: /项目中心/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { name: '项目中心' })).toBeVisible();
});

test('日历选择某日后可打开该日期日志', async ({ page }) => {
  await page.goto('/calendar');
  const target = page.locator('.calendar-day').filter({ hasText: /^15$/ }).first();
  await target.click();
  await page.getByRole('link', { name: '查看这一天的日志' }).click();
  await expect(page).toHaveURL(/\/journal\?date=\d{4}-\d{2}-15$/);
  await expect(page.getByRole('heading', { name: '每日工作日志' })).toBeVisible();
});

test('智能录入明确区分预览与正式保存', async ({ page }) => {
  await page.goto('/capture');
  await page.getByRole('textbox', { name: '工作记录原文' }).fill('开了一个会');
  await page.getByRole('button', { name: '预览输入（不保存）' }).click();
  await expect(page.getByText('未保存 / 未校验')).toBeVisible();
  await expect(page.locator('.capture-result').getByText('开了一个会', { exact: true })).toBeVisible();
});

test('手机屏幕可使用导航并看到真实输入入口', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.getByRole('button', { name: '打开导航' })).toBeVisible();
  const mobileMap = page.getByRole('region', { name: '冒险地图导航' });
  await expect(mobileMap.locator('a.map-node')).toHaveCount(6);
  await expect(mobileMap.locator('a.map-node')).toHaveCSS('position', 'relative');
  for (const node of await mobileMap.locator('a.map-node').all()) {
    const bounds = await node.boundingBox();
    expect(bounds).not.toBeNull();
    if (bounds) {
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(391);
    }
  }
  await page.screenshot({ path: testInfo.outputPath('home-mobile.png'), fullPage: true });
  await page.getByRole('button', { name: '打开导航' }).click();
  const sidebar = page.locator('aside.app-sidebar');
  await expect(sidebar.getByRole('link', { name: /每日工作日志/ })).toBeVisible();
  await sidebar.getByRole('link', { name: /每日工作日志/ }).click();
  await expect(page).toHaveURL(/\/journal$/);
});
