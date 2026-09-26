import { defineConfig, devices } 
  from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://katalon-demo-cura.herokuapp.com',
    headless: false,
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [{name: 'chromium',
      use: { ...devices['Desktop Chrome']} }],
});