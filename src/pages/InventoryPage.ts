import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly title: Locator;
    readonly addToCartButtons: Locator;
    readonly sortDropdown: Locator;
    readonly menuButton: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.title = page.getByText('Products', { exact: true });
        this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
        this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.cartButton = page.getByRole('button', { name: 'Cart, empty' });
    }

    async goto(): Promise<void> {
        await this.page.goto('/inventory.html');
    }
}
