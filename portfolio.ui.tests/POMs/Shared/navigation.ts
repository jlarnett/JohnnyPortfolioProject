
import {Page, Locator} from "@playwright/test"

export class PortfolioNavigationBar {
    readonly page: Page;
    readonly navigationBarContainer: Locator;
    url: string = "https://johnnyarnett.com";

    constructor(page: Page) {
        this.page = page;
        this.navigationBarContainer = page.getByTestId('NavigationMenu');
    }

    async Navigate() {
        await this.page.goto(this.url);
    }
}
