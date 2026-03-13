const { test, expect, chromium } = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();


test.describe('@regression verifying pos', async () => {
    let page;
    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        const context = await browser.newContext()
        page = await context.newPage()

        const loginPage = new sections.LoginPage(page, test)
        await loginPage.launchAppAndLoginWithValidCredentials();
    })

    test("Verifying the dashboard page", async () => {
        const dashboardpage = new sections.DashboardPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.DevicesPage();
        await dashboardpage.ScrollToPos();
        await dashboardpage.ListOfPos();
        await dashboardpage.kabebMenuAnd();
        await dashboardpage.SettingClick();
        await page.waitForTimeout(5000);

    })

    
    


})
