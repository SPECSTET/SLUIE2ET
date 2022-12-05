import { test, expect } from '@playwright/test';
import dayjs from 'dayjs';

const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const date = dayjs(`${year}-${month}-15`).format('DD.MM.YYYY');

test.beforeEach(async ({ page }) => {
	await page.goto(
		process.env.SLUIE2ET_URL +
			'/de/autom_testing/forms/alle-komponenten-formular-standardseite-store.html'
	);
	await page.waitForTimeout(1000);
	await page.waitForLoadState('networkidle');

	if (process.env.SLUIE2ET_HAS_DISCLAIMER == '1') {
		await page.locator('text=Hinweis schliessen').click();
		await page.waitForLoadState('networkidle');
	}

	if (page.url().includes('login')) {
		await page.locator('[name=j_username]').fill('cug-ch-testing-viewer');
		await page.locator('[name=j_password]').fill('Login4Acce$$2Te$tingCug');
		await page.locator('button :text("Anmelden")').click();
		await page.waitForTimeout(1000);
		await page.waitForLoadState('networkidle');
		await page.goto(
			process.env.SLUIE2ET_URL +
				'/de/autom_testing/forms/alle-komponenten-formular-standardseite-store.html'
		);
	}
});

test.describe(process.env.SLUIE2ET_ENV.toUpperCase() + ' - Formulartests @forms', () => {
	test('Tooltip Screenshot Test', async ({ page }) => {
		await page.locator("[data-g-name='Tooltip']").scrollIntoViewIfNeeded();
		await page.locator("[data-g-name='Tooltip']").click();
		await page.waitForTimeout(2000);

		expect(
			await page.locator("[data-g-name='TooltipPopup']").screenshot({
				animations: 'disabled',
				caret: 'hide',
			})
		).toMatchSnapshot({
			maxDiffPixelRatio: 0.05,
		});
	});

	test('Formular Screenshot Test', async ({ page }) => {
		await page.locator("[data-g-name='Form']").scrollIntoViewIfNeeded();
		expect(
			await page.screenshot({
				animations: 'disabled',
				mask: [page.locator('.m-appointment-scheduler__time')],
				caret: 'hide',
			})
		).toMatchSnapshot({
			maxDiffPixelRatio: 0.02,
		});
	});

	test('Alle Werte korrekt (Happy Path)', async ({ page }) => {
		await page.locator('div[role="combobox"]:has-text("Frau")').click();
		await page.locator('li[role="option"]:has-text("Herr")').click();
		await page.locator('label:has-text("Herr")').click();

		await page.locator('input[name="Name"]').fill('Doe');
		await page.locator('input[name="Vorname"]').fill('John');
		await page.locator('input[name="PLZ"]').fill('8045');
		await page.locator('input[name="E-Mail"]').fill('e2e-test@noreply.specstet.com');
		await page.locator('textarea[name="textarea"]').fill('Play that funky test');
		await page.locator('label:has-text("Radiobutton online.test")').click();

		await page.locator('input[name="Datumsauswahl"]').click();
		await page.locator(`.datepicker [aria-label="${date}"]`).click();

		await page.locator('input[name="Terminplaner-date1"]').click();
		await page.locator(`.appointmentscheduler [aria-label="${date}"]`).click();

		await page.locator('input[name="Terminplaner-timefrom1"]').click();
		await page.locator('input[name="Terminplaner-timeuntil1"]').click();

		await page.locator('input[name="Disclaimer"]').click({ force: true });

		await page.locator('button:has-text("Senden")').click();
		await page.waitForLoadState('networkidle');

		await page.locator('text=Danke für Ihre Angaben').scrollIntoViewIfNeeded();

		expect(page.url()).toContain('alle-komponenten-formular-danke.html');
	});
});
