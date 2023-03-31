import { expect, test } from '@playwright/test';
import axios from 'axios';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
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
		test(`Vanity URL: ${record.vanity}`, async () => {
			const url = env.baseUrl + `/${record.vanity}`;

			let statusCode = 999;

			await axios
				.get(url, {
					validateStatus: function (status) {
						return status < 500;
					},
				})
				.then((response) => {
					statusCode = response.status;
				});

			expect(statusCode).not.toBe(404);
		});
	}
});
