import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import env from '../../env.config';

// Deactivate Screenshots and Video recording for vanity url tests
test.use({
	screenshot: 'off',
	video: 'off',
});

// Load the list with Vanity URLs
let records = parse(fs.readFileSync('./tests/vanity-url/vanity-url.csv'), {
	columns: true,
	skip_empty_lines: true,
	bom: true,
	delimiter: ';',
});

// Sort list by Vanity
records.sort((a, b) => {
	const vanityA = a.vanity.toUpperCase();
	const vanityB = b.vanity.toUpperCase();
	if (vanityA < vanityB) {
		return -1;
	}
	if (vanityA > vanityB) {
		return 1;
	}
	return 0;
});

test.describe('Validate Vanity URLs @vanitys', () => {
	for (const record of records) {
		test(`Vanity URL: ${record.vanity}`, async ({ page }) => {
			const [_, response] = await Promise.all([
				page.goto(env.baseUrl + `/${record.vanity}`),
				page.waitForEvent(
					'response',
					(response) => response.request().resourceType() === 'document'
				),
			]);

			var url = page.url();

			// Result output for validation
			fs.appendFileSync(
				'vanity-url-validation.csv',
				`${record.vanity};${url};${response.status()}\n`
			);

			expect(response.status()).not.toBe(404);
		});
	}
});
