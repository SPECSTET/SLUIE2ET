import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import env from '../../env.config';

test.use({
	video: 'off',
});

test.beforeEach(async ({ page }) => {
	await page.goto(
		env.baseUrl + '/de/autom_testing/forms/alle-komponenten-formular-standardseite-store.html'
	);
	await page.waitForTimeout(1000);
	await page.waitForLoadState('networkidle');

	if (env.hasDisclaimer) {
		await page.locator('text=Hinweis schliessen').click();
		await page.waitForLoadState('networkidle');
	}

	if (page.url().includes('login')) {
		await page.locator('[name=j_username]').fill(env.cugUser);
		await page.locator('[name=j_password]').fill(env.cugPw);
		await page.locator('button :text("Anmelden")').click();
		await page.waitForTimeout(1000);
		await page.waitForLoadState('networkidle');
		await page.goto(
			env.baseUrl + '/de/autom_testing/forms/alle-komponenten-formular-standardseite-store.html'
		);
	}
});

const records = parse(fs.readFileSync('./tests/komponenten/pages.csv'), {
	columns: true,
	skip_empty_lines: true,
	bom: true,
	delimiter: ';',
});

test.describe(env.env + ' - Komponententests @components', () => {
	for (const record of records) {
		test(record.title, async ({ page, browser }) => {
			const browserContext = await browser.newContext();
			browserContext.clearCookies();

			// BEISPIEL FÜR REQUEST INTERCEPTION
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

			await page.goto(env.baseUrl + record.url);
			await page.waitForTimeout(
				5000
			); /* Dauert recht lange, bis alle Objekte animiert eingeblendet wurden (esp. YouTube) */

			const handle = await page.$('header');
			if (handle) {
				await handle.waitForElementState('stable');
			}

			await page.evaluate(async () => {
				const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
					mask: [],
					caret: 'hide',
					fullPage: true,
				})
			).toMatchSnapshot({
				maxDiffPixelRatio: 0.02,
			});
		});
	}
});
