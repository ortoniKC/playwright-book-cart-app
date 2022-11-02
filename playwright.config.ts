import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: !true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [["html", {
    open: "on-failure"
  }]],
  use: {
    baseURL: "https://bookcart.azurewebsites.net/",
    actionTimeout: 10,
    trace: 'on-first-retry',
    video: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    }
  ]
};

export default config;
