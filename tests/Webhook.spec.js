const { test, expect } = require('@playwright/test');
const sections = require('../pages/pageIndex');
require("dotenv").config();
const devices = require("../test_Data/addDeviceOptions.json");

test.describe('@regression Webhook connection duration check', async () => {
    let context;
    let page;
    const addPosSystem = devices.devices[3];
    const register = devices.LightSpeedRegisterOption[0];

    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        test.setTimeout(240000);
        context = await browser.newContext();
        page = await context.newPage();

        const loginPage = new sections.LoginPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
    });

    test.afterAll('Closing context', async () => {
        await context.close();
    });

    test.only('EEPD-TC-34673 POS-Check the duration for which the webhook connection remains active', async () => {
        const dashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const lightSpeedPage = new sections.LightSpeedSalePage(page, test);

        // 1. Navigate to Dashboard
        await dashboardPage.GotoDashboardPage();

        // 2-3. Add POS system: Lightspeed (X-series)
        await dashboardPage.DevicesPage();
        await dashboardPage.selectDeviceTypeInAddDevice(addPosSystem);
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.PosDrpDwn(); 
        await posSystemPage.selectLightSpeed();

        // 4-5. OAuth Redirection and Login to Lightspeed
        await posSystemPage.clickSignintoLightSpeed();
        await lightSpeedPage.loginToLightSpeeed();
        await lightSpeedPage.accpetInstallation();

        // 6. Verify "Successfully Authenticated" message
        await posSystemPage.verifyPosSystemPageAppeard();
        await posSystemPage.authticationSuccessMessage();

        // 7. Click Webhook connect button and verify Green Indicator
        await posSystemPage.connectPOS();
        await posSystemPage.verifyWebhookStatusIndicator();

        // 8-9. Add Register
        await posSystemPage.clickPOSRegisterTab();
        await posSystemPage.clickPlusIcon();
        await posSystemPage.SelectRegister(register);
        await posSystemPage.clickAddRegister();
        
        // 10. Associate location (Site) and cameras, then save changes
        await posSystemPage.SelectSite();
        await posSystemPage.SelectCamera();
        await posSystemPage.clickSaveChangesBtn();
        await posSystemPage.veifySuccessmessage();
        await posSystemPage.clickSaveAndExitBtn();

        // 11. Navigate to Lightspeed and perform a transaction
        const itemsToSelect = ["Coke / 2 ltr"];
        await lightSpeedPage.navigateaToLightSpeedSignInPage();
        await lightSpeedPage.loginToLightSpeeed(); 
        await lightSpeedPage.goToSellTab();
        await lightSpeedPage.selectRegister();
        await lightSpeedPage.selectItems(itemsToSelect);
        await lightSpeedPage.clickPay();
        await lightSpeedPage.CashButton();
        // 12. Verify POS-Transactions and History Browser in VMS
        await dashboardPage.GotoDashboardPage();
        await dashboardPage.navigateToPOSTransactions();
        await dashboardPage.navigateHistoryBrowser();

        // 13. Verify duration (UI Connection remains active until disconnect)
        // Check the Webhook indicator status again in the VMS settings
        await dashboardPage.GotoDashboardPage();
        await dashboardPage.ScrollToPos();
        await dashboardPage.expandLightSpeedPOSSystem();
        await dashboardPage.SettingClick();
        await posSystemPage.verifyWebhookStatusIndicator();

        console.log("EEPD-TC-34673: Webhook connection verified successfully active.");
    });
});