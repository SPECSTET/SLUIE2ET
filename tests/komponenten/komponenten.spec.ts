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
    await page.waitForLoadState('networkidle');
    await page.evaluate(async () => {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      for (let i = 0; i < document.body.scrollHeight; i += 10) {
        window.scrollTo(0, i);
        await delay(10);
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');

    // https://addyosmani.com/blog/puppeteer-recipes/#request-interception
    // https://developers.apify.com/academy/puppeteer-playwright/reading-intercepting-requests#modifyng-the-request
    // https://picsum.photos/id/870/200/300?grayscale&blur=2
    await page.evaluate(async () => {
      let mImages = document.getElementsByClassName('m-mood-image__image');
      if(mImages.length > 0){
        document.getElementsByClassName('m-mood-image__image')[0].style.visibility = 'hidden';
      }
    });

    await page.waitForTimeout(2000);

    expect(
      await page.screenshot({ 
        animations: 'disabled', 
        mask: [
          //page.locator('.m-mood-image__image')
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
