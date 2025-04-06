import {Page, Locator} from "@playwright/test"

export class PortfolioContactPage {
    readonly page: Page;

    //Name Input
    readonly contactNameInput: Locator;
    readonly contactNameErrorValidationLocator: Locator;

    readonly contactEmailInput: Locator;
    readonly contactEmailErrorValidationLocator: Locator;

    readonly contactMessageInput: Locator;
    readonly contactMessageErrorValidationLocator: Locator;

    readonly contactImportanceDropdownInput: Locator;
    readonly contactUrgencyDropdownInput: Locator;

    readonly saveButton: Locator;


    url: string = "https://johnnyarnett.com/Contact";

    constructor(page: Page) {
        this.page = page;
        this.contactNameInput = page.getByTestId('ContactName');
        this.contactNameErrorValidationLocator = page.getByTestId('ContactNameValidation');
        this.contactEmailInput = page.getByTestId('ContactEmail');
        this.contactEmailErrorValidationLocator = page.getByTestId('ContactEmailValidation');
        this.contactMessageInput = page.getByTestId('ContactMessage');
        this.contactMessageErrorValidationLocator = page.getByTestId('ContactMessageValidation');
        this.contactImportanceDropdownInput = page.getByTestId('ContactImportance');
        this.contactUrgencyDropdownInput = page.getByTestId("ContactUrgency");
        this.saveButton = page.getByTestId('ContactSubmit');
    }

    async Navigate() {
        await this.page.goto(this.url);
    }
}