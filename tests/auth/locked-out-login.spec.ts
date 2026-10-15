// spec: specs/saucedemo-login.md (scenario 1.2)
import { test, expect } from '../../src/fixtures/base';
import { meta } from 'reporting-labs';
import users from '../data/users.json';

test.describe('Login', () => {
    test('locked-out-user-shows-error @smoke @critical', async ({ page, loginPage, inventoryPage }) => {
        meta({ priority: 'P1', severity: 'critical', owner: 'naveen', feature: 'login', component: 'authentication' });

        // 1. Type the locked-out user's username into the Username field
        await loginPage.goto();
        await loginPage.usernameInput.fill(users.locked.username);
        await expect(loginPage.usernameInput).toHaveValue(users.locked.username);

        // 2. Type the password into the Password field
        await loginPage.passwordInput.fill(users.locked.password);

        // 3. Click the Login button
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toBeVisible();
        await expect(inventoryPage.title).toBeHidden();
    });
});
