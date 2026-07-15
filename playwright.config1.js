// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    retries: 1,
    timeout: 30000,
    expect:
    {
        timeout: 50000
    },

    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */

    projects: [
        {
            name: 'chromium',
            use: {

                browserName: 'chromium',
                screenshot: 'only-on-failure',
                video: 'retain-on-failure',
                headless: true
                //viewport: { width: 1280, height: 720 },
                
            }

        },


        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },

        {
            name: 'webkit',
            use:
            {
                browserName: 'webkit',
                screenshot: 'only-on-failure',
                headless: true,
                video: 'retain-on-failure',
                viewport: { width: 1920, height: 1080 }
              //  ...devices['iphonee 11'],

            }
        },


        /* Test against mobile viewports. */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* Test against branded browsers. */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});

