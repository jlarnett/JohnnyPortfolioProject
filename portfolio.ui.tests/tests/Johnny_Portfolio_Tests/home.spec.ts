import { test, expect } from '../CustomTestFixtures/custom-test';
import AxeBuilder from "@axe-core/playwright";

test.describe('Portfolio - Home Page Tests', async () => {
    test('Open and navigate to Johnny Portfolio website', async ({ portfolioHomePage }) => {
        //Check for 3 important sections of the portfolio page. Check that the image, GitHub projects, and project build
        //sections are visible
        await expect(portfolioHomePage.portfolioHeadshotImage).toBeVisible();
        await expect(portfolioHomePage.portfolioGithubProjectsSection).toBeVisible();
        await expect(portfolioHomePage.portfolioNephalemBuildsSection).toBeVisible();
    });

    test('Check connect with me links work as intended', async ({ portfolioHomePage }) => {
        //Expected links to find within connect with me text section
        const expectedHrefs = [
            'https://www.linkedin.com/in/johnny-arnett-350959135/',
            'https://www.instagram.com/jaynett96/#',
            'https://nhaindustries.azurewebsites.net/',
            'https://www.facebook.com/johnny.arnett.9/',
            'https://www.youtube.com/@NHA_Coyote', ];

        //Get a list of links from portfolio connect link locator
        const connectWithMeLinks = await portfolioHomePage.portfolioConnectLinks.all();
        const actualLinks = [];

        //Loop through each link found and push onto stack
        for (const link of connectWithMeLinks) {
            actualLinks.push(await link.getAttribute('href'));
        }

        //Check that the values are equal
        expect(actualLinks).toEqual(expectedHrefs)
    });

    test('Verify Nephalem Game blob download works as intended', async ({ portfolioHomePage }) => {
        //Get one of the nephalem build blob links
        const BuildLinks = await portfolioHomePage.portfolioNephalemBuildsSection.locator('a').all();

        console.log(`Located ${BuildLinks.length} blob build links`);

        for (const link of BuildLinks)
        {
            //Trigger and wait for download event -> Produce download object
            const [download] = await Promise.all([
                portfolioHomePage.page.waitForEvent('download'),  // Waits for download to start
                await link.click() // Replace with actual button/trigger
            ]);

            // Verify the suggested filename is of type .zip
            console.log('Downloaded filename:', download.suggestedFilename());
            expect(download.suggestedFilename()).toContain('.zip'); // Example file type check
        }
    });

    test('Check for accessibility problems using AxeBuilder', async ({ portfolioHomePage }) => {
        //Wait for stable site load state -> Then perform accessibility scan on portfolio home page.
        await portfolioHomePage.page.waitForLoadState("networkidle");
        const accessibilityScanResults = await new AxeBuilder({page: portfolioHomePage.page}).analyze();

        for(const violation in accessibilityScanResults.violations){
            console.log(violation);
        }
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});



