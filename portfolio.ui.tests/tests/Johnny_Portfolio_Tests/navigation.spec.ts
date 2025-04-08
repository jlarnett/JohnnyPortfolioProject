import { test, expect } from '../CustomTestFixtures/custom-test';

test.describe('Portfolio - Navigation Tests', async () => {

    test('Check navigation menu is present', async ({ navigationBarMenu }) => {
        await expect(navigationBarMenu.navigationBarContainer).toBeVisible();
    });

    test('Check navigation menu has 5 or more links', async ({ navigationBarMenu }) => {
        const links = await navigationBarMenu.navigationBarContainer.locator('a').all();
        expect(links.length).toBeGreaterThanOrEqual(5);
    });

    test('Check Basic Navigation Functionality - Home Page', async ({ navigationBarMenu }) => {
        await navigationBarMenu.navigationBarContainer.getByTestId('NavLink-JohnnyArnett').click();
        expect(navigationBarMenu.page.url()).toContain('https://johnnyarnett.com/');
    });
    test('Check Basic Navigation Functionality - Build Link', async ({ navigationBarMenu }) => {
        await navigationBarMenu.navigationBarContainer.getByTestId('NavLink-GameBuilds').click();
        expect(navigationBarMenu.page.url()).toContain('https://johnnyarnett.com/Builds');
    });
    test('Check Basic Navigation Functionality - Contact Me', async ({ navigationBarMenu }) => {
        await navigationBarMenu.navigationBarContainer.getByTestId('NavLink-ContactMe').click();
        expect(navigationBarMenu.page.url()).toContain('https://johnnyarnett.com/Contact');
    });
    test('Check Basic Navigation Functionality - Github', async ({ navigationBarMenu }) => {
        await navigationBarMenu.navigationBarContainer.getByTestId('RightNavLink-Github').click();
        expect(navigationBarMenu.page.url()).toContain('https://github.com/jlarnett');
    });
    test('Check Basic Navigation Functionality - Youtube', async ({ navigationBarMenu }) => {
        await navigationBarMenu.navigationBarContainer.getByTestId('RightNavLink-Youtube').click();
        expect(navigationBarMenu.page.url()).toContain('https://www.youtube.com/@NHA_Coyote');
    });

});



