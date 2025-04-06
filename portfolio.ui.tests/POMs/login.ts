import {Page, Locator} from "@playwright/test"

export class YTLogin {
    readonly page: Page;
    readonly emailTextBoxInput: Locator;
    readonly nextBtn: Locator;

    url: string = "https://youtube.com";

    constructor(page: Page) {
        this.page = page;
        this.emailTextBoxInput = page.locator("#identifierId");
        this.nextBtn = page.locator("#identifierNext");
    }

    async Navigate() {
        await this.page.goto(this.url);
        await this.page.getByLabel("Sign in").click();
    }

    async EnterPreCredentialsEmail(emailAddress: string) {
         await this.emailTextBoxInput.fill(emailAddress);
    }

    async MoveToSecondaryCredentialsPage() {
        await this.nextBtn.click();
   }
}