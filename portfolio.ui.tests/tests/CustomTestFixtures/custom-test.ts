import { test as base, Page} from '@playwright/test';
import { UAGenTool } from "../../src/BotAvoidance"
import { PortfolioHome } from "../../POMs/Portfolio/home";
import { PortfolioContactPage } from "../../POMs/Portfolio/contact";
import { PortfolioNavigationBar } from "../../POMs/Shared/navigation";

/**
 * type used for extending playwright tests. Page Object models / DB object potentially stored here for easy access
 */
type CustomTestFixtures = {
    page: Page;
    portfolioHomePage: PortfolioHome;
    portfolioContactPage: PortfolioContactPage;
    navigationBarMenu: PortfolioNavigationBar;
};

/**
 * Custom test fixtures. Used to create accessible pages throughout the UI Test.
 */
export const test = base.extend<CustomTestFixtures>({
    page: async ({ page }, use) => {
        await use(page);

        // Add memory profiling after test
        const client = await page.context().newCDPSession(page);
        await client.send('Performance.enable');
        const metrics = await client.send('Performance.getMetrics');
        const memMetrics = metrics.metrics.filter(m => m.name.includes('JSHeap'));

        console.log('📊 JS Memory:');
        memMetrics.forEach(m =>
          console.log(`${m.name}: ${(m.value / 1024 / 1024).toFixed(2)} MB`)
        );
    },
    portfolioHomePage: async ({ page }, use) => {
        //Create new home page and pass in the page
        //InitializeTestInstance(page);

        const portfolioPage = new PortfolioHome(page);
        await portfolioPage.Navigate();

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
    },
    navigationBarMenu: async ({ page }, use) => {
        //Create new home page and pass in the page
        //InitializeTestInstance(page);

        const navigationBar = new PortfolioNavigationBar(page);
        await navigationBar.Navigate();

        //Use fixture value in test?
        await use(navigationBar);
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
