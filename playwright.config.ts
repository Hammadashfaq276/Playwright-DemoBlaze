import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  
  // Disable parallelism
  fullyParallel: false,
  workers: 1,  // Run all tests sequentially

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    trace: 'on-first-retry',
    headless: true,               // <-- Headless mode enabled
    screenshot: 'only-on-failure',   // Automatic screenshot on failure
    video: 'retain-on-failure',      // Optional video capture
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment if you want Firefox / Webkit
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});


