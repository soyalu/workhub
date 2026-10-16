import { expect, test } from '@playwright/test';

// Browser-only UI smoke tests stub the API health indicator; Go API is
// verified independently by its own CI job. Avoid Vite proxy 500 noise.
test.beforeEach(async ({ page }) => {
  await page.route('**/api/health', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ status: 'ok', service: 'workhub-api' }),
  }));
});

test('首页的冒险场景及七个功能地标可访问', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '今日 · 主线任务' })).toBeVisible();
  const map = page.getByRole('region', { name: '冒险地图导航' });
  await expect(map.locator('img.adventure-scene')).toBeVisible();
  await expect(map).toHaveClass(/is-raster-art/);
  const mapImage = map.locator('img.adventure-scene');
  await expect(mapImage).toHaveAttribute('src', '/art/home-map.webp');
  await expect.poll(() => mapImage.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(1200);
  const traveler = page.locator('img.traveler-scene-image');
  await expect(traveler).toBeVisible();
  await expect(traveler).toHaveAttribute('src', '/art/backgrounds/traveler-original.webp');
  await expect(traveler).toHaveCSS('object-fit', 'cover');
  const portraitPanel = page.locator('.adventure-hero .character-stage');
  await expect(portraitPanel).toBeVisible();
  const portraitBounds = await portraitPanel.boundingBox();
  expect(portraitBounds).not.toBeNull();
  expect(portraitBounds!.height).toBeGreaterThan(230);
  expect(portraitBounds!.width).toBeGreaterThan(240);
  await expect.poll(() => traveler.evaluate((img) => (img as HTMLImageElement).naturalWidth)).toBe(320);
  await expect(page.locator('.sidebar-scenery')).toHaveCSS('background-image', /sidebar-night\.webp/);
  await expect(map.locator('a.map-node')).toHaveCount(7);
  await expect(page.locator('.home-bottom .fantasy-card-header h2')).toHaveText([
    '信息收件箱', '工作日历', '每日工作日志', '近期成就与奖励',
  ]);
  await expect(page.locator('.home-quick-grid a')).toHaveCount(6);
  await expect(page.locator('.home-bottom .ornate-parchment')).toHaveCount(4);
  await expect(page.locator('.ornate-frame--map')).toHaveCount(1);
  await expect(page.locator('.ornate-frame--companion')).toHaveCount(1);
  await expect(map.locator('a.map-node .landmark-emblem')).toHaveCount(7);
  await expect(map.locator('a.map-node .landmark-chevron')).toHaveCount(7);
  await expect(map.getByRole('link', { name: /支线任务/ })).toBeVisible();
  await expect(map.getByRole('link', { name: /信息收件箱/ })).toBeVisible();
  await expect(page.locator('aside.app-sidebar nav.sidebar-navigation a')).toHaveCount(10);
  await expect(page.locator('.topbar')).toBeHidden();
  await expect(page.locator('.quest-chain-reward')).toHaveAttribute('href', '/growth');
  await expect(page.locator('.quest-chain-orb').first()).toHaveText('1');
  await expect(page.locator('.home-inbox-row')).toHaveCount(4);
  await expect(page.locator('.home-agenda-row')).toHaveCount(4);
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
  await expect(mobileMap.locator('a.map-node')).toHaveCount(7);
  await expect(mobileMap.locator('a.map-node').first()).toHaveCSS('position', 'relative');
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

// M1 acceptance matrix catches intermediate-width layout regressions.
for (const width of [1440, 1280, 1024, 900, 390]) {
  test('冒险首页 ' + width + 'px 视口无横向溢出且节点完整', async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const map = page.getByRole('region', { name: '冒险地图导航' });
    const img = map.locator('img.adventure-scene');
    await expect.poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(1200);
    await expect(map).toHaveClass(/is-raster-art/);
    const mapRect = await map.boundingBox();
    expect(mapRect).not.toBeNull();
    const nodes = map.locator('a.map-node');
    await expect(nodes).toHaveCount(7);
    for (const link of await nodes.all()) {
      await expect(link).toBeVisible();
      const rect = await link.boundingBox();
      expect(rect).not.toBeNull();
      if (rect && mapRect) {
        expect(rect.x).toBeGreaterThanOrEqual(mapRect.x - 1);
        expect(rect.x + rect.width).toBeLessThanOrEqual(mapRect.x + mapRect.width + 1);
        expect(rect.y).toBeGreaterThanOrEqual(mapRect.y - 1);
        expect(rect.y + rect.height).toBeLessThanOrEqual(mapRect.y + mapRect.height + 1);
      }
    }
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(width + 1);
    await page.screenshot({ path: testInfo.outputPath('home-' + width + '.png'), fullPage: true });
  });
}

test('地图美术缺失时明确提示且导航仍可用', async ({ page }) => {
  await page.route('**/art/home-map.webp', (route) => route.fulfill({ status: 404, body: 'not found' }));
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('地图美术资源加载失败');
  await expect(page.getByRole('region', { name: '冒险地图导航' })).toHaveClass(/art-missing/);
  await expect(page.locator('img.adventure-scene')).toBeHidden();
  await page.getByRole('region', { name: '冒险地图导航' }).getByRole('link', { name: /项目中心/ }).click();
  await expect(page).toHaveURL('http://127.0.0.1:5173/projects');
});

test('首页快速录入类别传递至录入页但不冒充已保存', async ({ page }) => {
  await page.goto('/');
  await page.locator('.home-quick-grid').getByRole('link', { name: '记会议' }).click();
  await expect(page).toHaveURL(/\/capture\?kind=meeting$/);
  await expect(page.getByText(/快捷入口：会议交流/)).toBeVisible();
  await expect(page.getByRole('button', { name: '预览输入（不保存）' })).toBeDisabled();
});


test('侧栏新增的支线任务与打卡工时均有明确页面而非无效链接', async ({ page }) => {
  await page.goto('/');
  await page.locator('.sidebar-navigation').getByRole('link', { name: '支线任务' }).click();
  await expect(page).toHaveURL(/\/side-quests$/);
  await expect(page.getByRole('heading', { name: '支线任务' })).toBeVisible();
  await page.locator('.sidebar-navigation').getByRole('link', { name: '打卡与工时' }).click();
  await expect(page).toHaveURL(/\/time-tracking$/);
  await expect(page.getByRole('heading', { name: '打卡与工时' })).toBeVisible();
});

test('首页七个地标各有独立目的地且图片与任务链分离', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const map = page.getByRole('region', { name: '冒险地图导航' });
  const anchors = await map.locator('a.landmark').evaluateAll(items => items.map(item => item.getAttribute('href')));
  expect(anchors).toEqual(['/tasks','/projects','/inbox','/capture','/calendar','/side-quests','/growth']);
  await expect(page.locator('.adventure-route')).toBeVisible();
  await expect(page.locator('.quest-chain-step')).toHaveCount(4);
  await expect(page.locator('.quest-chain-reward')).toHaveAttribute('href', '/growth');
});


test('1440 与 1280 首页人物立绘区域不能塌陷', async ({ page }) => {
  for (const width of [1440, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const stage = page.locator('.adventure-hero .character-stage');
    const rect = await stage.boundingBox();
    expect(rect).not.toBeNull();
    expect(rect!.height).toBeGreaterThan(230);
    expect(rect!.width).toBeGreaterThan(240);
    await expect(stage.locator('img.traveler-scene-image')).toBeVisible();
  }
});


// Catch fixed-height layouts that leave large empty regions on tall desktops.
for (const { width, height } of [
  { width: 1440, height: 900 },
  { width: 1600, height: 1000 },
  { width: 2048, height: 1241 },
]) {
  test('desktop homepage fills ' + width + 'x' + height + ' without grey gap', async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const map = page.getByRole('region', { name: '冒险地图导航' });
    const cards = page.getByRole('region', { name: '首页工作摘要' });
    await expect(map).toBeVisible();
    await expect(cards).toBeVisible();
    const geometry = await page.evaluate(() => {
      const scene = document.querySelector('.adventure-map')!.getBoundingClientRect();
      const summary = document.querySelector('.home-bottom')!.getBoundingClientRect();
      const note = document.querySelector('.adventure-dashboard .mock-notice')!.getBoundingClientRect();
      return {
        sceneHeight: scene.height,
        cardsBottom: summary.bottom,
        noteBottom: note.bottom,
        pageWidth: document.documentElement.scrollWidth,
      };
    });
    expect(geometry.noteBottom).toBeGreaterThanOrEqual(height - 24);
    expect(geometry.cardsBottom).toBeGreaterThanOrEqual(height - 48);
    expect(geometry.pageWidth).toBeLessThanOrEqual(width + 1);
    const agendaCard = page.locator('.home-bottom .fantasy-card').nth(1);
    const fourthEntry = page.locator('.home-agenda-row').last();
    const calendarBounds = await agendaCard.boundingBox();
    const fourthBounds = await fourthEntry.boundingBox();
    expect(calendarBounds).not.toBeNull();
    expect(fourthBounds).not.toBeNull();
    expect(fourthBounds!.y + fourthBounds!.height).toBeLessThanOrEqual(calendarBounds!.y + calendarBounds!.height - 2);

    if (height >= 1000) expect(geometry.sceneHeight).toBeGreaterThan(620);
    await page.screenshot({ path: testInfo.outputPath('viewport-fill-' + width + 'x' + height + '.png'), fullPage: true });
  });
}


test('人物背景素材缺失时明确提示，但项目导航仍可使用', async ({ page }) => {
  await page.route('**/art/backgrounds/traveler-original.webp', (route) => route.fulfill({ status: 404, body: 'not found' }));
  await page.goto('/');
  await expect(page.getByRole('alert')).toContainText('人物场景素材加载失败');
  await expect(page.locator('.m16-scene-missing')).toBeVisible();
  await page.getByRole('region', { name: '冒险地图导航' }).getByRole('link', { name: /项目中心/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
});


test('M1.7 金色主线地标动画可关闭且仍可导航', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const quest = page.getByRole('link', { name: /今日主线任务：/ });
  const toggle = page.getByRole('button', { name: '地图动态效果' });
  await expect(quest).toHaveAttribute('data-animation-enabled','true');
  await expect(toggle).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.quest-particle-aura')).toHaveCount(1);
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-pressed','false');
  await expect(page.locator('.quest-particle-aura')).toHaveCount(0);
  await quest.click();
  await expect(page).toHaveURL(/\/tasks$/);
  await page.goto('/');
  await expect(page.getByRole('button', { name: '地图动态效果' })).toHaveAttribute('aria-pressed','false');
});

test('M1.7 自动尊重减少动态效果偏好', async ({ page }) => {
  await page.emulateMedia({ reducedMotion:'reduce' });
  await page.goto('/');
  await expect(page.getByRole('button', { name:'地图动态效果' })).toBeDisabled();
  await expect(page.getByRole('link', { name:/今日主线任务：/ })).toHaveAttribute('data-animation-enabled','false');
  await expect(page.locator('.quest-particle-aura')).toHaveCount(0);
});
