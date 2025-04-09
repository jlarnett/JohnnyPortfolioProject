
import {Page, Locator} from "@playwright/test"

export class PortfolioNavigationBar {
    readonly page: Page;
    readonly navigationBarContainer: Locator;
    readonly connectLinkContainer: Locator;
    url: string = "https://johnnyarnett.com";

    constructor(page: Page) {
        this.page = page;
        this.navigationBarContainer = page.getByTestId('NavigationMenu');
        this.connectLinkContainer = page.getByTestId('PortfolioConnectLinks');
    }

    async Navigate() {
        await this.page.goto(this.url);
    }
}
