import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

// Deactivate Screenshots and Video recording for vanity url tests
test.use({
  screenshot: 'off',
  video: 'off'
});

// Load the list with Vanity URLs
const records = parse(
  fs.readFileSync('./tests/vanity-url/vanity-url.csv'),
  {
    columns: true,
    skip_empty_lines: true,
    bom: true,
    delimiter: ';',
  }
);

test.describe('Validate Vanity URLs @vanitys', () => {

  // Reset generated validation CSV file
  // fs.writeFileSync('vanity-url-validation.csv', 'vanity;url;status\n');

  for (const record of records) {
    test(`Vanity URL: ${record.vanity}`, async ({ page }) => {
      const [_, response] = await Promise.all([
        page.goto(process.env.SLUIE2ET_URL + `/${record.vanity}`, {
          waitUntil: 'networkidle',
        }),
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
      
      expect.soft(response.status()).not.toBe(404);

      expect(
        url,
        `Vanity '${record.vanity}' sollte '${record.url}' sein, ist aber ${url}`
      ).toContain(record.url);
    });
  }
});
