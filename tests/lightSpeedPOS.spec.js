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

    test('EEPD-TC-34622 Delete all registers and Light Speed POS System',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.ScrollToPos();
        //await dashboardpage.expandLightSpeedPOSSystem();
        await page.waitForTimeout(parseInt(process.env. SMALL_WAIT));
        await dashboardpage.deleteAllAddedRegisters();
        await dashboardpage.kabebMenuAnd();
        await dashboardpage.actionButtons();
        await dashboardpage.deleteLightSpeedPOSSystem();

    })
    test('EEPD-TC-34581	POS-Click on Sign into Lightspeed (X-Series)" button.',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.selectLightSpeed();
        //verify click on sign in to light speed it will navigate to light speed login page
        await posSystemPage.clickSignintoLightSpeed();
    })
    test('EEPD-TC-34587 POS-Enter valid login credentials on the Lightspeed or Square login page.',async()=>{
         test.setTimeout(60000)
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const lightSpeedPage = new sections.LightSpeedSalePage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.selectLightSpeed();
        await posSystemPage.clickSignintoLightSpeed();
        await lightSpeedPage.loginToLightSpeeedWithValidCredentials();
        await lightSpeedPage.accpetInstallation();
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.authticationSuccessMessage();
        await posSystemPage.connectPOS();  
    })
    test('EEPD-TC-34580,EEPD-TC-34578 NEG-Verify that the "Registers" tab is not clickable without user authentication.',async()=>{
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.selectLightSpeed();
        //verify tooltip and registers tab should be disabled before login to light speed
        await posSystemPage.verifySigninIconToolTipBeforeloginTOLightSpeed();
        //Registers tab should be disabled before login to light speed
        await posSystemPage.addRegisterTabShouldBeDisabled();
    });

    test('EEPD-TC-34577 NEG-POS system selection is missing',async()=>{	
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifySignInOptionNotDisplayed();    
    })

    test('EEPD-TC-34582 NEG-Enter invalid login credentials on the Lightspeed login pag',async()=>{	
        const dashboardpage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const lightSpeedPage = new sections.LightSpeedSalePage(page, test);

        await dashboardpage.GotoDashboardPage();
        await dashboardpage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.selectLightSpeed();
        await posSystemPage.clickSignintoLightSpeed();
        await lightSpeedPage.loginToLightSpeedWith("invalidUser@123","InvaliPass@123");
        await lightSpeedPage.verifyInvalidLoginCredentialMessage();
        
        //step mentoind it will return to VMS, but its still in L-S Login page
    })



})
