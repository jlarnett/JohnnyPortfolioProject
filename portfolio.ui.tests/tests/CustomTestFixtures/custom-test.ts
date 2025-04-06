import { test as base, Page} from '@playwright/test';
import { YTHome } from "../../POMs/home";
import { YTLogin } from "../../POMs/login";
import { UAGenTool } from "../../src/BotAvoidance"
import { PortfolioHome } from "../../POMs/Portfolio/home";
import { PortfolioContactPage } from "../../POMs/Portfolio/contact";

/**
 * type used for extending playwright tests. Page Object models / DB object potentially stored here for easy access
 */
type YTFixtures = {
    // page: Page;
    homePage: YTHome;
    loginPage: YTLogin;
    portfolioHomePage: PortfolioHome;
    portfolioContactPage: PortfolioContactPage;
};

/**
 * Custom test fixtures. Used to create accessible pages throughout the UI Test.
 */
export const test = base.extend<YTFixtures>({
    // page: async({ page }, use) => {
    //     await use(page);
    // },
    homePage: async ({ page }, use) => {
        //InitializeTestInstance(page);
        //Create new home page and pass in the page
        const homePage = new YTHome(page);
        await homePage.Navigate();

        //Use fixture value in test?
        await use(homePage);
    },
    loginPage: async ({ page }, use) => {
        //InitializeTestInstance(page);

        //Create new home page and pass in the page
        const loginPage = new YTLogin(page);
        await loginPage.Navigate();

        //Use fixture value in test?
        await use(loginPage);
    },
    portfolioHomePage: async ({ page }, use) => {
        //Create new home page and pass in the page
        //InitializeTestInstance(page);

        const portfolioPage = new PortfolioHome(page);
        await portfolioPage.Navigate();

        await portfolioPage.page.waitForResponse('https://johnnyarnett.com/api/Builds');

        //Use fixture value in test?
        await use(portfolioPage);
    },
    portfolioContactPage: async ({ page }, use) => {
        //Create new home page and pass in the page
        //InitializeTestInstance(page);

        const contactPage = new PortfolioContactPage(page);
        await contactPage.Navigate();


        //Use fixture value in test?
        await use(contactPage);
    }
});

/**
 * takes in playwright Page object and applies the WebDriveFlagRemoverTool removal script
 * attaches userAgent -> UAGenTool.RandomChromiumWinUA() to get random value. Helps with bot detection
 * @param page -> playwright Page object type we want to apply bot avoidance too.
 * @constructor
 */
function InitializeTestInstance(page: Page) {
    console.log('Applying bot avoidance - /WebDriveFlagRemoverTool.js');
    page.addInitScript('../src/WebDriveFlagRemoverTool.js');

    console.log('Applying random chromium winUA value -> userAgent');
    test.use({ userAgent:  UAGenTool.GetRandomChromiumWinUA()});
}
  
export { expect } from "@playwright/test";