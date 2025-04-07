import { test, expect } from '../CustomTestFixtures/custom-test';
import AxeBuilder from "@axe-core/playwright";


test.describe('Portfolio - Contact Me Tests', async () => {
    test('Open and navigate to Johnny Portfolio Contact Me Page', async ({ portfolioContactPage }) => {
        //Check for 3 important sections of the portfolio contact page. Check that the name, email, and message input
        //sections are visible
        await expect(portfolioContactPage.contactNameInput).toBeVisible();
        await expect(portfolioContactPage.contactEmailInput).toBeVisible();
        await expect(portfolioContactPage.contactMessageInput).toBeVisible();
    });

    test('Check basic form required validations', async ({ portfolioContactPage }) => {

        //Execute save button before entering any form information
        await portfolioContactPage.saveButton.click();

        //Check that name, email, message required validation messages are shown
        await expect(portfolioContactPage.contactNameErrorValidationLocator).toBeVisible();
        await expect(portfolioContactPage.contactEmailErrorValidationLocator).toBeVisible();
        await expect(portfolioContactPage.contactMessageErrorValidationLocator).toBeVisible();

    });

    test('Check for accessibility problems using AxeBuilder', async ({ portfolioContactPage }) => {
        //Wait for stable site load state -> Then perform accessibility scan on portfolio home page.
        await portfolioContactPage.page.waitForLoadState("networkidle");
        const accessibilityScanResults = await new AxeBuilder({page: portfolioContactPage.page}).analyze();

        for(const violation in accessibilityScanResults.violations){
            console.log(violation);
        }
        expect(accessibilityScanResults.violations).toEqual([]);
    });
    
    test('Check for accessibility problems using AxeBuilder', async ({ portfolioContactPage }) => {
        //Wait for stable site load state -> Then perform accessibility scan on portfolio home page.
        await portfolioContactPage.page.waitForLoadState("networkidle");
        await portfolioContactPage.page.emulateMedia({ colorScheme: 'dark'});
        const accessibilityScanResults = await new AxeBuilder({page: portfolioContactPage.page}).analyze();

        for(const violation in accessibilityScanResults.violations){
            console.log(violation);
        }
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});



