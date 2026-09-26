import { test as base, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { AppointmentPage } from '../pages/AppointmentPage';
import { LoginPage } from '../pages/LoginPage';

type PageFixtures = {
  loginPage: LoginPage;
  appointmentPage: AppointmentPage;
  evidenceScreenshot: void;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
  evidenceScreenshot: [async ({ page }, use, testInfo) => {
    await use();

    const evidenceDirectory = join(process.cwd(), 'evidencias');
    const testName = testInfo.titlePath.join('-').replace(/[^a-zA-Z0-9_-]/g, '_');
    const screenshotPath = join(
      evidenceDirectory,
      `${testInfo.project.name}-${testName}-retry-${testInfo.retry}.png`
    );

    await mkdir(evidenceDirectory, { recursive: true });
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }, { auto: true }],
});

export { expect };