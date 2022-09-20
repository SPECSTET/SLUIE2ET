import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

test.use({
  video: 'off'
});

//var url = '';

test.beforeEach(async ({ page }) => { 
  await page.goto(process.env.SLUIE2ET_URL + '/de/autom_testing.html');
  await page.waitForLoadState('networkidle');

  //var url = await page.url();
  if(page.url().includes('login')){
    await page.locator('[name=j_username]').fill('cug-ch-testing-viewer');
    await page.locator('[name=j_password]').fill('Login4Acce$$2Te$tingCug');
    await page.locator('button[type=submit]').click();
    await page.waitForLoadState('networkidle');
  }

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
    
    // const imgResponse = await page.request.fetch('https://picsum.photos/id/1000/2000/2000?grayscale');
    // await page.route('**/*', async route => {
    //   if(route.request().resourceType() === 'image' && route.request().url().endsWith('.jpg')){
    //     route.fulfill({
    //       response: imgResponse
    //     });        
    //   } else {
    //     route.continue();
    //   }
    // });

    await page.goto(process.env.SLUIE2ET_URL + record.url);
    //await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    
    const handle = await page.$('header');
    if(handle){
      await handle.waitForElementState('stable');
    }
    
    //await page.waitForTimeout(3000);

    await page.evaluate(async () => {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
      for (let i = 0; i < document.body.scrollHeight; i += 10) {
        window.scrollTo(0, i);
        await delay(20);
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');

    await page.waitForTimeout(5000);

    expect(
      await page.screenshot({ 
        animations: 'disabled', 
        mask: [
          
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
