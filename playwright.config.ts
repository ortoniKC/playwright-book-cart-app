import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  testMatch: [
    "tests/registerUser.test.ts",
    "tests/loginUser.test.ts",
    "tests/addProductToCart.test.ts"
  ],
  timeout: 1 * 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: !true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [["json", {
    outputFile: "report.json"
  }], ["html", {
    open: "on-failure"
  }]],
  use: {
    headless: false,
    baseURL: "https://bookcart.azurewebsites.net/",
    // actionTimeout: 2 * 60 * 1000,
    // trace: "on",
    // video: "on",
    screenshot: "on"
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
