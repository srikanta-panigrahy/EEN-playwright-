const { test, expect, chromium } = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();

test.describe('@smoke Login page test', async () => {
    let page;
    test.beforeAll(' Create context, page and navigate to login page', async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new sections.LoginPage(page, test);
        await loginPage.navigateToLoginPage(process.env.BASE_URL);
    })

    test('Login with valid credentials', async () => {
        const loginPage = new sections.LoginPage(page, test);

        await loginPage.login([process.env.USER_EMAIL], [process.env.USER_PASSWORD]);
    })

})




