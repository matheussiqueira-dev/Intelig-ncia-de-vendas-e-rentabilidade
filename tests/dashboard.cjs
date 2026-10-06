const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

async function exportRows(page) {
  const pending = page.waitForEvent('download');
  await page.locator('#export').click();
  const download = await pending;
  const csv = fs.readFileSync(await download.path(), 'utf8');
  assert.equal(csv.charCodeAt(0), 0xFEFF, 'CSV must start with a UTF-8 BOM');
  return csv.slice(1).split('\r\n');
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROME_CHANNEL ? { channel: process.env.CHROME_CHANNEL } : {}),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const target = process.env.TEST_URL || pathToFileURL(path.resolve(__dirname, '../index.html')).href;
    await page.goto(target, { waitUntil: 'domcontentloaded' });
    await page.locator('#product-rows tr').first().waitFor();
    const initial = await page.locator('#revenue').textContent();
    await page.locator('[data-days="7"]').click();
    assert.notEqual(await page.locator('#revenue').textContent(), initial);
    const points = await page.locator('#trend polyline').first().getAttribute('points');
    assert.equal(points.split(' ').length, 7, 'Seven days must produce seven data points');
    assert.ok(points.split(' ').every(point => Number(point.split(',')[1]) < 208), 'Example sales on every day must not produce artificial zeroes');
    const all = await page.locator('#revenue').textContent();
    await page.selectOption('#channel-select', 'store');
    assert.notEqual(await page.locator('#revenue').textContent(), all);

    await page.fill('#search', 'cafeteira');
    assert.equal(await page.locator('#product-rows tr').count(), 1);
    let csv = await exportRows(page);
    assert.equal(csv.length, 2);
    assert.match(csv[1], /^Cafeteira compacta;/);
    assert.ok(csv[1].endsWith(';7;store;DEMONSTRACAO'));

    await page.locator('[data-view="channels"]').click();
    assert.equal(await page.locator('#products-panel').isVisible(), false);
    csv = await exportRows(page);
    assert.equal(csv.length, 6, 'Hidden product search must not filter channel export');
    await page.locator('.skip').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => location.hash), '#channels');
    assert.ok(await page.locator('#main').evaluate(node => node === document.activeElement));
    assert.equal(await page.locator('#page-title').textContent(), 'Cada canal, um resultado.');

    await page.locator('[data-view="products"]').click();
    await page.fill('#search', 'sem resultado');
    assert.equal(await page.locator('#empty').isVisible(), true);
    await page.locator('#export').click();
    assert.match(await page.locator('#status').textContent(), /Nenhum produto/);
    await page.locator('#clear-search').click();
    assert.equal(await page.locator('#product-rows tr').count(), 5);
    assert.ok(await page.locator('#search').evaluate(node => node === document.activeElement));
    await page.locator('[data-view="overview"]').click();
    const chart = await page.locator('#trend').evaluate(node => ({
      width: node.clientWidth, viewBox: Number(node.getAttribute('viewBox').split(' ')[2]),
    }));
    assert.equal(chart.viewBox, chart.width);
    await page.selectOption('#channel-select', 'all');

    for (const width of [1920, 1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1080 });
      for (const days of [7, 30, 90]) {
        await page.locator(`[data-days="${days}"]`).click();
        const overflow = await page.evaluate(() => ({
          page: document.documentElement.scrollWidth > innerWidth,
          metric: [...document.querySelectorAll('.metric-value')].some(node => node.scrollWidth > node.clientWidth),
        }));
        assert.deepEqual(overflow, { page: false, metric: false }, `${width}px / ${days} days`);
      }
    }
    const heights = await page.locator('.nav-link,.segments button,#channel-select,#export').evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().height));
    assert.ok(heights.every(height => height >= 44));
    await page.locator('#export').focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    const focus = await page.locator('#export').evaluate(node => getComputedStyle(node).outlineWidth);
    assert.equal(focus, '2px');
    assert.deepEqual(errors, []);
    if (process.env.SCREENSHOT_DIR) {
      fs.mkdirSync(process.env.SCREENSHOT_DIR, { recursive: true });
      for (const [name, width] of [['mobile', 390], ['desktop', 1920]]) {
        await page.setViewportSize({ width, height: 1080 });
        await page.locator('[data-days="30"]').click();
        await page.mouse.move(0, 0);
        await page.screenshot({ path: path.join(process.env.SCREENSHOT_DIR, `${name}.png`), fullPage: true });
      }
    }
    console.log('PASS: review regressions, period/channel filters, CSV, search recovery, keyboard focus, touch targets and all periods at six widths; no JavaScript errors.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
