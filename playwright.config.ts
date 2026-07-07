import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'on-failure' }]],

  use: {
    baseURL: 'https://b2b.dunyaaviation.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 60000,
  },

  timeout: 120000,

  projects: [
    {
      name: 'setup',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
        storageState: 'playwright/.auth/user.json',
      },
    },
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        headless: true,
      },
    },
  ],
});