const { test, expect, chromium } = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();


test.describe('@regression verifying pos', async () => {
    let page;
    let context;
    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        test.setTimeout(60000)

        const loginPage = new sections.LoginPage(page, test)
        await loginPage.launchAppAndLoginWithValidCredentials();
    });
    test.afterAll('Closing context',async()=>{
         await context.close();
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
