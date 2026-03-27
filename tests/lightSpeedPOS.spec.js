const { test} = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();
const devices = require("../test_Data/addDeviceOptions.json")

test.describe('@regression Light Speed POS test cases', async () => {
    let context
    let page;
    const addPosSystem = devices.devices[3];
    const register = devices.LightSpeedRegisterOption[0];
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

    test("EEPD-TC-34627,EEPD-TC-34624 Add Register, Delete Register", async () => {
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
      

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.DevicesPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectRegister(register);
        await posSystemPage.clickAddRegister();
    
        await posSystemPage.SelectSite();
        await posSystemPage.SelectCamera();
        await posSystemPage.clickSaveChangesBtn();
        await posSystemPage.veifySuccessmessage();
        await posSystemPage.clickSaveAndExitBtn();
        await dashboardpage.ScrollToPos();
        await dashboardpage.expandLightSpeedPOSSystem();
        await dashboardpage.verifyRegisterExistInPosSytem(register);
        await dashboardpage.deleteRegister(register);
        await dashboardpage.verifyRegisterShouldNotExistInPosSytem(register);
    })

    
    test('EEPD-TC-34628 NEG-Invlid register name',async()=>{
        //Should we navigate to a page in each test, if previous test case failed these will be in layout page
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.searchRegister(devices.invlidRegisterName);
        await posSystemPage.verifyNomatchingRegisterMessage();
    })
    test('EEPD-TC-34604 NEG-camera mandatory error message',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectRegister(register);
        await posSystemPage.clickAddRegister();
        await posSystemPage.SelectSite();
        await posSystemPage.clickSaveChangesBtn();
        await posSystemPage.cameraRequiresErrorMessage();

    })

    test('EEPD-TC-34601 NEG-Navigate to the POS registers tab, click the "+" icon to select registers, and then click on the cancel button.',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectRegister(register);
        await posSystemPage.clickCancelInAddRegisterPanel();
        await posSystemPage.registerNotPresent(register)

    })

    test('Delete all registers',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.ScrollToPos();
        //await dashboardpage.expandLightSpeedPOSSystem();
        await page.waitForTimeout(parseInt(process.env. SMALL_WAIT));
        await dashboardpage.deleteAllAddedRegisters();
        await dashboardpage.kabebMenuAnd();
        await dashboardpage.cababMenuOptions();
        await dashboardpage.deleteLightSpeedPOSSystem();

    })
})
