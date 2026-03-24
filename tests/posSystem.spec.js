const { test} = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();
const devices = require("../test_Data/addDeviceOptions.json")

test.describe('@regression Add register and delete register', async () => {
    let context
    let page;
    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        test.setTimeout(60000)
        context = await browser.newContext()
        page = await context.newPage()

        const loginPage = new sections.LoginPage(page, test)
        await loginPage.launchAppAndLoginWithValidCredentials();

    });
    test.afterAll('Closing context',async()=>{
         await context.close();
    })

    test("Add Register", async () => {
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        await dashboardpage.GotoDashboardPage();
        await dashboardpage.DevicesPage();
        await dashboardpage.selectDeviceTypeInAddDevice(devices.devices[3]);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectRegister(devices.SquareRegisterOptions[0]);
        await posSystemPage.clickAddRegister();
    
        await posSystemPage.SelectSite();
        await posSystemPage.SelectCamera();
        await posSystemPage.clickSaveChangesBtn();
        await posSystemPage.veifySuccessmessage();
        await posSystemPage.clickSaveAndExitBtn();
        await dashboardpage.ScrollToPos();
        await dashboardpage.expandSquaewPOSSystem();
        await dashboardpage.verifyRegisterExistInSquarePOS(devices.SquareRegisterOptions[0]);
        await dashboardpage.deleteRegister(devices.SquareRegisterOptions[0]);
    })


    test('EEPD-TC-34628 Invlid register name',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.selectDeviceTypeInAddDevice(devices.invlidRegisterName);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
    })
})
