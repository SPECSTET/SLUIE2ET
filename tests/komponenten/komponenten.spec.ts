import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test.use({
  video: 'off'
});

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.SLUIE2ET_URL + '/de/autom_testing.html');

  if(process.env.SLUIE2ET_HAS_DISCLAIMER == '1'){
    await page.locator('text=Hinweis schliessen').click();
  }
});

const records = parse(
  fs.readFileSync('./tests/komponenten/pages.csv'),
  {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    delimiter: ';',
  }
);

test.describe(process.env.SLUIE2ET_ENV.toUpperCase() + ' - Komponententests @components', () => {
  for (const record of records) {
  test(record.title, async ({ page, browser }) => {
    const browserContext = await browser.newContext();
    browserContext.clearCookies();
    await page.goto(process.env.SLUIE2ET_URL + record.url);
    await page.locator("#footer").scrollIntoViewIfNeeded();
    await page.evaluate(() => document.getElementById('footer').remove());
    await page.evaluate(() => document.getElementsByTagName('header')[0].remove());
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    await page.waitForLoadState('networkidle');

    expect(
      await page.screenshot({ 
        animations: 'disabled', 
        mask: [
          page.locator('.m-mood-image__ratio-enforcer')
        ],
        caret: 'hide',
        fullPage: true
      })
      )
      .toMatchSnapshot({
        maxDiffPixelRatio: 0.02 
      });
  });
}
  

});
