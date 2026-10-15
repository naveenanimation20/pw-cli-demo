import { defineConfig } from '@playwright/test';
import reportingLabs from './reporting-labs.config';

export default defineConfig({
    testDir: './tests',
    reporter: [
        ['list'],
        ['reporting-labs', reportingLabs],
        ['allure-playwright', { resultsDir: 'allure-results' }],
    ],
    use: {
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
    },
});
