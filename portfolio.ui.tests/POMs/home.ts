import {Page, Locator} from "@playwright/test"

export class YTHome {
    readonly page: Page;
    readonly searchBarInput: Locator;
    readonly searchBarExecuteBtn: Locator;

    url: string = "https://youtube.com";

    constructor(page: Page) {
        this.page = page;
        this.searchBarInput = page.getByRole('combobox', { name: 'Search' });
        this.searchBarExecuteBtn = page.getByRole('button', { name: 'Search', exact: true });
    }

    async Navigate() {
        await this.page.goto(this.url);
    }

    async SearchForVideo(videoTitle: string) {
        await this.searchBarInput.fill(videoTitle);
        await this.searchBarExecuteBtn.click();
    }
}