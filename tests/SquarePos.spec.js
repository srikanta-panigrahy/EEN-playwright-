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

    test('EEPD-TC-34582 , Login with valid credentials And Entering invalid credentials on the Lightspeed login page', async () => {
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

    test('EEPD-TC-34581, POS-Click on Sign into Lightspeed (X-Series)" button.', async () => {
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


    test('EEPD-TC-34580,POS-Verify the mouse over text next to Oauth:Sign into Lightspeed(X-series) button', async () => {
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
        await SquarePosPage.PosSystemOptions();
        await posSystemPage.PosDrpDwn();
        await SquarePosPage.Logoutfromcurrentpage();


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

})

