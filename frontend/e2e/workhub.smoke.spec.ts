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


test('M1.7 hover snapshot keeps Pixi overlay non-interactive', async ({ page }, testInfo) => {
  await page.setViewportSize({ width:1440, height:900 });
  await page.goto('/');
  const quest = page.getByRole('link', { name:/今日主线任务：/ });
  await quest.hover();
  const aura = page.locator('.quest-particle-aura');
  await expect(aura).toBeVisible();
  await expect(aura).toHaveCSS('pointer-events','none');
  await expect.poll(async () => {
    const hasCanvas = await aura.locator('canvas').count();
    const state = await aura.getAttribute('data-effect-state');
    return hasCanvas > 0 || state === 'fallback';
  }, { timeout:15000 }).toBeTruthy();
  if (await aura.locator('canvas').count()) {
    await expect(aura.locator('canvas')).toHaveCSS('pointer-events','none');
  }
  await page.screenshot({ path:testInfo.outputPath('quest-particle-hover.png'), fullPage:true });
});


test('M1.7 七地标共用动画规则，同一时间最多一个 Pixi Canvas', async ({ page }, testInfo) => {
  await page.setViewportSize({ width:1440, height:900 });
  await page.goto('/');
  const map = page.getByRole('region', { name:'冒险地图导航' });
  await expect(map.locator('.animated-landmark')).toHaveCount(7);
  await expect(map.locator('.quest-particle-aura')).toHaveCount(1);
  for (const [name, tone] of [
    ['项目中心','project'],['信息收件箱','message'],
    ['快速录入','capture'],['工作日历','calendar'],
    ['支线任务','side'],['成长分析','growth'],
  ]) {
    await map.getByRole('link', { name:new RegExp('^' + name + '：') }).hover();
    await expect(map.locator('.quest-particle-aura')).toHaveCount(1);
    await expect(map.locator('.quest-particle-aura')).toHaveAttribute('data-tone',tone);
    expect(await map.locator('.quest-particle-aura canvas').count()).toBeLessThanOrEqual(1);
  }
  await page.screenshot({path:testInfo.outputPath('seven-landmark-motion.png'),fullPage:true});
  await page.getByRole('button',{name:'地图动态效果'}).click();
  await expect(map.locator('.quest-particle-aura')).toHaveCount(0);
  await expect(map.locator('.animated-landmark[data-animation-enabled="false"]')).toHaveCount(7);
  await map.getByRole('link',{name:/^成长分析：/}).click();
  await expect(page).toHaveURL(/\/growth$/);
});

test('M1.7 系统减少动效时七个地标均静止',async ({page})=>{
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.animated-landmark[data-animation-enabled="false"]')).toHaveCount(7);
  await expect(page.locator('.quest-particle-aura')).toHaveCount(0);
});


test('persistent Pixi stage keeps the same canvas across landmark hover', async ({page}) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const map=page.getByRole('region',{name:'冒险地图导航'});
  const stage=map.locator('.persistent-particle-stage');
  await expect(stage).toHaveCount(1);
  await expect(stage).toHaveAttribute('data-stage-lifecycle','persistent');
  await expect.poll(async()=>{
    const canvas=await stage.locator('canvas').count();
    return canvas===1 || await stage.getAttribute('data-effect-state')==='fallback';
  }).toBeTruthy();
  const initialCanvas=await stage.locator('canvas').elementHandle();
  for (const [name,tone] of [
    ['项目中心','project'],['信息收件箱','message'],
    ['成长分析','growth'],['今日主线任务','quest'],
  ]) {
    await map.getByRole('link',{name:new RegExp('^'+name+'：')}).hover();
    await expect(stage).toHaveAttribute('data-tone',tone);
    await expect(map.locator('.persistent-particle-stage')).toHaveCount(1);
    if(initialCanvas) {
      expect(await initialCanvas.evaluate(element=>element.isConnected)).toBe(true);
      expect(await stage.locator('canvas').count()).toBe(1);
    }
  }
});


test('成长徽章及宝箱保留未计算状态且图片缺失安全降级',async ({page})=>{
  await page.goto('/');
  const panel=page.getByRole('complementary',{name:'旅行者成长面板'});
  await expect(panel.locator('.m16-stat')).toHaveCount(4);
  await expect(panel.locator('[data-reward-status="locked"]')).toHaveCount(1);
  await expect(panel.getByText('经验值尚未计算')).toBeVisible();
  await expect(page.locator('.quest-chain-reward')).toHaveAttribute('href','/growth');
});


test('M1.7 installed art files are decoded rather than using fallback icons', async ({page}, testInfo) => {
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const panel=page.getByRole('complementary',{name:'旅行者成长面板'});
  const badges=panel.locator('.m16-stat-ring img.optional-art');
  await expect(badges).toHaveCount(4);
  const chest=panel.locator('[data-reward-status="locked"] img.optional-art');
  await expect(chest).toHaveCount(1);
  for(const img of [badges.nth(0),badges.nth(1),badges.nth(2),badges.nth(3),chest]){
    await expect.poll(async()=>{
      return img.evaluate((el)=>el instanceof HTMLImageElement && el.complete && el.naturalWidth>0);
    }).toBe(true);
  }
  const map=page.getByRole('region',{name:'冒险地图导航'});
  for(const [label,tone] of [
    ['今日主线任务','quest'],['项目中心','project'],['信息收件箱','message'],
    ['快速录入','capture'],['工作日历','calendar'],
    ['支线任务','side'],['成长分析','growth'],
  ]){
    await map.getByRole('link',{name:new RegExp('^'+label+'：')}).hover();
    const art=map.locator('.animated-landmark[data-theme="'+tone+'"] .landmark-aura-art img.optional-art');
    await expect(art).toHaveCount(1);
    await expect.poll(async()=>{
      return art.evaluate(el=>el instanceof HTMLImageElement && el.complete && el.naturalWidth>0);
    }).toBe(true);
  }
  await page.screenshot({path:testInfo.outputPath('installed-art-hover-growth.png'),fullPage:true});
});


test('M1.7 painted landmark art is present or transparently falls back',async({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const map=page.getByRole('region',{name:'冒险地图导航'});
  const artManifest=await page.evaluate(async()=>{
    const r=await fetch('/art/landmarks/manifest.json');
    return r.ok && r.headers.get('content-type')?.includes('json');
  });
  await expect(map.locator('.animated-landmark')).toHaveCount(7);
  if(artManifest) {
    await expect(map.locator('.landmark-art-ready')).toHaveCount(7);
    for(const theme of ['quest','project','message','capture','side','calendar','growth']){
      const node=map.locator('.animated-landmark[data-theme="'+theme+'"]');
      await expect(node).toHaveAttribute('data-art-ready','true');
      const picture=node.locator('.landmark-painted-art img');
      await expect.poll(()=>picture.evaluate(img=>
        img instanceof HTMLImageElement && img.complete && img.naturalWidth===510 && img.naturalHeight===325
      )).toBe(true);
      await expect(node.locator('.landmark-scroll strong')).toBeVisible();
    }
  } else {
    await expect(map.locator('.landmark-art-ready')).toHaveCount(0);
  }
  await page.screenshot({path:testInfo.outputPath('painted-landmarks-desktop.png'),fullPage:true});
  await map.getByRole('link',{name:/^项目中心：/}).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test('M1.7 painted landmarks preserve mobile navigation and hit areas',async({page},testInfo)=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const map=page.getByRole('region',{name:'冒险地图导航'});
  await expect(map.locator('.animated-landmark')).toHaveCount(7);
  const manifestAvailable=await page.evaluate(async()=>
    (await fetch('/art/landmarks/manifest.json')).ok
  );
  if(manifestAvailable) {
    await expect(map.locator('.landmark-art-ready')).toHaveCount(7);
    for (const node of await map.locator('.landmark-art-ready').all()) {
      const title=node.locator('.landmark-scroll strong');
      await expect(title).toBeVisible();
      await expect(node.locator('.landmark-scroll small')).toBeHidden();
      const pos=await node.boundingBox();
      const label=await title.boundingBox();
      expect(pos).not.toBeNull();
      expect(label).not.toBeNull();
      // Titles must remain inside the active painted banner, not drift
      // into the next column or out of the map.
      expect(label!.x).toBeGreaterThanOrEqual(pos!.x + pos!.width*.47);
      expect(label!.x+label!.width).toBeLessThanOrEqual(pos!.x+pos!.width+1);
    }
  }
  await page.screenshot({path:testInfo.outputPath('painted-landmarks-mobile.png'),fullPage:true});
  await map.getByRole('link',{name:/^快速录入：/}).click();
  await expect(page).toHaveURL(/\/capture$/);
});


test('M1.7 per-landmark layout alignment keeps all painted text clear of emblems',async ({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const map=page.getByRole('region',{name:'冒险地图导航'});
  const desired = [
    ['quest',21.1,46.8],['project',52.8,29.7],['message',83.0,32.0],
    ['capture',65.1,57.2],['calendar',46.6,78.7],['side',21.1,79.4],['growth',83.4,78.9],
  ] as const;
  await expect(map.locator('.landmark-art-ready')).toHaveCount(7);
  for(const [theme,x,y] of desired){
    const node=map.locator('.animated-landmark[data-theme="'+theme+'"]');
    const strong=node.locator('.landmark-scroll strong');
    const subtitle=node.locator('.landmark-scroll small');
    const sprite=node.locator('.landmark-painted-art');
    await expect(strong).toBeVisible();
    await expect(subtitle).toBeVisible();
    const bounds=await node.boundingBox();
    const title=await strong.boundingBox();
    const sub=await subtitle.boundingBox();
    const art=await sprite.boundingBox();
    const scene=await map.boundingBox();
    expect(bounds&&title&&sub&&art&&scene).toBeTruthy();
    // Explicit map-scene percentages, independent of display resolution.
    const measuredX=(bounds!.x+bounds!.width/2-scene!.x)/scene!.width*100;
    const measuredY=(bounds!.y+bounds!.height/2-scene!.y)/scene!.height*100;
    expect(measuredX).toBeGreaterThan(x-1.2);
    expect(measuredX).toBeLessThan(x+1.2);
    expect(measuredY).toBeGreaterThan(y-1.2);
    expect(measuredY).toBeLessThan(y+1.2);
    // Main text must start beyond the metal crest region, within the
    // actual banner writing area rather than the glowing image alpha.
    expect(title!.x).toBeGreaterThanOrEqual(art!.x+art!.width*.52);
    expect(sub!.x).toBeGreaterThanOrEqual(art!.x+art!.width*.52);
    expect(title!.x+title!.width).toBeLessThanOrEqual(art!.x+art!.width*.95);
    expect(sub!.x+sub!.width).toBeLessThanOrEqual(art!.x+art!.width*.95);
    expect(title!.y+title!.height).toBeLessThan(sub!.y+2);
  }
  await page.screenshot({path:testInfo.outputPath('calibrated-seven-landmarks-desktop.png'),fullPage:true});
});

test('M1.7 narrow-mobile calibrated landmarks keep titles in banner safe area', async ({page},testInfo)=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  const map=page.getByRole('region',{name:'冒险地图导航'});
  await expect(map.locator('.landmark-art-ready')).toHaveCount(7);
  for(const node of await map.locator('.landmark-art-ready').all()){
    const title=node.locator('.landmark-scroll strong');
    await expect(title).toBeVisible();
    await expect(node.locator('.landmark-scroll small')).toBeHidden();
    const outer=await node.boundingBox();
    const text=await title.boundingBox();
    expect(outer&&text).toBeTruthy();
    expect(text!.x).toBeGreaterThanOrEqual(outer!.x+outer!.width*.49);
    expect(text!.x+text!.width).toBeLessThanOrEqual(outer!.x+outer!.width+1);
  }
  await page.screenshot({path:testInfo.outputPath('calibrated-seven-landmarks-mobile.png'),fullPage:true});
});

test('M1.7 banner text blocks align vertically with measured art centers',async ({page})=>{
  const expected:Record<string,number>={quest:184.5,project:180.5,message:184.5,capture:194,calendar:192,side:193.5,growth:192.5};
  for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
    await page.setViewportSize(viewport);
    await page.goto('/');
    const map=page.getByRole('region',{name:'冒险地图导航'});
    await expect(map.locator('.landmark-art-ready')).toHaveCount(7);
    for(const [theme,center] of Object.entries(expected)){
      const node=map.locator('.animated-landmark[data-theme="'+theme+'"]');
      const [imageBounds,textBounds]=await Promise.all([
        node.locator('.landmark-painted-art').boundingBox(),
        node.locator('.landmark-scroll').boundingBox()
      ]);
      expect(imageBounds&&textBounds).toBeTruthy();
      const artCenter=imageBounds!.y+imageBounds!.height*center/325;
      const labelCenter=textBounds!.y+textBounds!.height/2;
      expect(Math.abs(artCenter-labelCenter),theme+' @ '+viewport.width+'px text vertical centering').toBeLessThan(1.75);
      await expect(node.locator('.landmark-scroll strong')).toBeVisible();
    }
  }
});


test('M1.7 sidebar compass and carved active menu match reference without blocking navigation', async ({page},testInfo)=>{
  await page.setViewportSize({width:1440,height:900});
  await page.goto('/');
  const sidebar=page.getByRole('complementary',{name:'主导航'});
  const crest=sidebar.locator('.brand-compass-svg');
  await expect(crest).toBeVisible();
  await expect(sidebar.locator('.brand-emblem')).toHaveCount(0);
  const mark=await crest.boundingBox();
  expect(mark).not.toBeNull();
  expect(mark!.width).toBeGreaterThanOrEqual(55);
  expect(mark!.height).toBeGreaterThanOrEqual(55);
  await expect(sidebar.locator('.nav-icon-wrap')).toHaveCount(10);
  const active=sidebar.getByRole('link',{name:'主页 · 冒险地图'});
  await expect(active).toHaveClass(/is-active/);
  await expect(active).toHaveAttribute('aria-current','page');
  await expect(active.locator('.sidebar-link-label')).toBeVisible();
  const plaque=active.locator('.sidebar-active-ornament');
  await expect(plaque).toBeVisible();
  expect(await plaque.locator('path').count()).toBeGreaterThanOrEqual(10);
  await expect(sidebar.locator('.sidebar-active-ornament')).toHaveCount(1);
  const layer=await plaque.evaluate(element=>({
    events:getComputedStyle(element).pointerEvents,
    zIndex:getComputedStyle(element).zIndex,
  }));
  expect(layer.events).toBe('none');
  expect(layer.zIndex).toBe('0');
  await page.screenshot({path:testInfo.outputPath('sidebar-brass-desktop.png'),fullPage:true});
  await sidebar.getByRole('link',{name:'工作日历'}).click();
  await expect(page).toHaveURL(/\/calendar$/);
  await expect(sidebar.getByRole('link',{name:'工作日历'})).toHaveClass(/is-active/);
  await expect(sidebar.locator('.sidebar-link.is-active')).toHaveCount(1);
  await expect(sidebar.locator('.sidebar-active-ornament')).toHaveCount(1);
});

test('M1.7 fantasy sidebar remains usable as a mobile drawer',async ({page},testInfo)=>{
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'打开导航'}).click();
  const sidebar=page.getByRole('complementary',{name:'主导航'});
  await expect(sidebar.locator('.brand-compass-svg')).toBeVisible();
  await expect(sidebar.locator('.sidebar-link')).toHaveCount(10);
  await expect(sidebar.getByRole('link',{name:'主页 · 冒险地图'})).toHaveClass(/is-active/);
  await expect(sidebar.locator('.sidebar-active-ornament')).toHaveCount(1);
  await page.screenshot({path:testInfo.outputPath('sidebar-brass-mobile.png'),fullPage:false});
  await sidebar.getByRole('link',{name:'项目中心'}).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(sidebar).not.toHaveClass(/is-open/);
});
