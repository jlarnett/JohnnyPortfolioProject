import {Page, Locator} from "@playwright/test"

export class PortfolioHome {
    readonly page: Page;
    readonly portfolioHeadshotImage: Locator;
    readonly portfolioNephalemBuildsSection: Locator;
    readonly portfolioGithubProjectsSection: Locator;
    readonly portfolioConnectLinks: Locator;
    url: string = "https://johnnyarnett.com";

    constructor(page: Page) {
        this.page = page;
        this.portfolioHeadshotImage = page.getByTestId('PortfolioHeadShot');
        this.portfolioNephalemBuildsSection = page.getByTestId('HeaderNephalemBuilds');
        this.portfolioGithubProjectsSection = page.getByTestId('GithubProjectShowcase');
        this.portfolioConnectLinks = page.getByTestId("PortfolioConnectLinks").locator('a');
    }

    async Navigate() {
        await this.page.goto(this.url);
    }
}