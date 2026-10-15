// spec: specs/saucedemo-login.md (scenario 1.1)
import { test, expect } from '../../src/fixtures/base';
import { meta } from 'reporting-labs';
import users from '../data/users.json';

test.describe('Login', () => {
    test('standard-user-login-success @smoke @critical', async ({ page, loginPage, inventoryPage }) => {
        meta({ priority: 'P0', severity: 'blocker', owner: 'naveen', feature: 'login', component: 'authentication' });

        // 1. Type the standard user's username into the Username field
        await loginPage.goto();
        await loginPage.usernameInput.fill(users.standard.username);
        await expect(loginPage.usernameInput).toHaveValue(users.standard.username);

        // 2. Type the password into the Password field
        await loginPage.passwordInput.fill(users.standard.password);
        await expect(loginPage.passwordInput).toHaveValue(users.standard.password);

        // 3. Click the Login button
        await loginPage.loginButton.click();
        await expect(page).toHaveURL(/\/inventory\.html$/);
        await expect(inventoryPage.title).toBeVisible();
        await expect(inventoryPage.addToCartButtons).toHaveCount(6);
        await expect(inventoryPage.sortDropdown).toHaveValue('az');
        await expect(inventoryPage.cartButton).toBeVisible();
        await expect(inventoryPage.menuButton).toBeVisible();
        await expect(loginPage.errorMessage).toHaveCount(0);
    });
});
