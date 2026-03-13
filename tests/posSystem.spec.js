const { test, expect, chromium } = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();
const devices = require("../test_Data/addDeviceOptions.json")

test.describe('@regression verifying pos', async () => {
    let page;
    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        const context = await browser.newContext()
        page = await context.newPage()

        const loginPage = new sections.LoginPage(page, test)
        await loginPage.launchAppAndLoginWithValidCredentials();

    })

    test.only("Add Register", async () => {
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test)
        await dashboardpage.GotoDashboardPage();
        await dashboardpage.DevicesPage();
        await dashboardpage.selectDeviceTypeInAddDevice(devices.devices[2]);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectSite();
        await posSystemPage.SelectBridge();

    })

    
    


})
