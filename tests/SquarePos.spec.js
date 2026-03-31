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
    test.afterAll('Closing context', async () => {
        await context.close();
    })

    test('EEPD-TC-34583,POS-Select Square from the POS system dropdown.', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await posSystemPage.PosDrpDwn();
        await posSystemPage.clickOnPos();
        await posSystemPage.SingInToPos();
        await LightSpeedSalePage.navigateToSquareSingInPage()
        await SquarePosPage.verifysingin();
        await SquarePosPage.logOutFromVMS();

    })

    test('EEPD-TC-34584 ,NEG-Enter invalid login credentails in Square login page', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await posSystemPage.PosDrpDwn();
        await posSystemPage.clickOnPos();
        await posSystemPage.SingInToPos();
        await LightSpeedSalePage.navigateToSquareSingInPage();
        await SquarePosPage.EnterUsername();
        await SquarePosPage.continue();
        await SquarePosPage.EnterPassword();
        await SquarePosPage.SingInBtn();
        await SquarePosPage.Invalidpassword();
        await SquarePosPage.logOutFromVMS();

    })

    test.only('EEPD-TC-34580,POS-Verify the mouse over text next to Oauth:Sign into Lightspeed(X-series) button', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await posSystemPage.PosDrpDwn();
        await posSystemPage.clickOnPos();
        await SquarePosPage.iIcon();
        await SquarePosPage.textVerify();

    })

    test('EEPD-TC-34579,POS-Navigate to the Dashboard and click the "+" icon to add a POS system.', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await posSystemPage.PosDrpDwn();
        await posSystemPage.clickOnPos()
        await SquarePosPage.PosSystemOptions();
        // await SquarePosPage.Logoutfromcurrentpage();


    })

    test('EEPD-TC-34578,NEG-Verify that the "Registers" tab is not clickable without user authentication.', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await SquarePosPage.RegistersDisableOrNot();


    })

    test('EEPD-TC-34577,NEG-Verify that the "Registers" tab is not clickable without user authentication.', async () => {
        const loginPage = new sections.LoginPage(page, test);
        const LightSpeedSalePage = new sections.LightSpeedSalePage(page, test);
        const DashboardPage = new sections.DashboardPage(page, test);
        const posSystemPage = new sections.PosSystemPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await SquarePosPage.checkingPosIsSelectedOrNot();
        await SquarePosPage.WithoutSelectingPosIndropDeown();

    })

    test("EEPD-TC-34668,NEG-User should not be allowed to see the transaction details when logged in through the Admin account", async () => {
        const DashboardPage = new sections.DashboardPage(page, test);
        const loginPage = new sections.LoginPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.launchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.selectDeviceTypeInAddDevice('Add POS system');
        await SquarePosPage.SearchForPosTransactions();

    })


    test("EEPD-TC-34667,NEG-User should not be allowed to see the transaction details when logged in through the Non-Admin account", async () => {
        const DashboardPage = new sections.DashboardPage(page, test);
        const loginPage = new sections.LoginPage(page, test);
        const SquarePosPage = new sections.SquarePosPage(page, test);
        await loginPage.NonAdminlaunchAppAndLoginWithValidCredentials();
        await DashboardPage.GotoDashboardPage();
        await DashboardPage.DevicesPage();
        await DashboardPage.NottohaveAddposDevice('Add POS system');
        // await SquarePosPage.Logoutfromcurrentpage();

    })

    test("EEPD-TC-34613,POS-Click on Settings", async () => {
        const dashboardpage = new sections.DashboardPage(page, test);
        const LoginPage = new sections.LoginPage(page, test);
        await LoginPage.launchAppAndLoginWithValidCredentials();
        await dashboardpage.DevicesPage();
        await dashboardpage.ScrollToPos();
        await dashboardpage.ListOfPos();
        await dashboardpage.kabebMenuAnd();
        await dashboardpage.SettingClick();
        await page.waitForTimeout(5000);

    })



})

