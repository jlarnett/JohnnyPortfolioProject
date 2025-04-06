import { test, expect } from './CustomTestFixtures/custom-test';

//Using custom fixture
test('Open Youtube', async ({homePage}) => {
    await homePage.Navigate(); 
});

test('Perform Search', async ({homePage}) => {
    await homePage.SearchForVideo('NHA Coyote');
});

test('Test Login', async ({loginPage}) => {
    await loginPage.EnterPreCredentialsEmail("imthegodcoyote@gmail.com");
    await loginPage.MoveToSecondaryCredentialsPage();
});
