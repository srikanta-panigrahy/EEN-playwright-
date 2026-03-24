const { test, expect, chromium } = require('@playwright/test');
const sections = require('../pages/pageIndex');


test.describe('@smoke Login page test', async () => {
    let page;
    let context;
    test.beforeAll(' Create context, page and navigate to login page', async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new sections.LoginPage(page, test);
        await loginPage.navigateToLoginPage(process.env.BASE_URL);
    })
    test.afterAll('Closing context',async()=>{
         await context.close();
    })

    test('Login with valid credentials', async () => {
        const loginPage = new sections.LoginPage(page, test);
        await loginPage.login([process.env.USER_EMAIL], [process.env.USER_PASSWORD]);
    })

})




