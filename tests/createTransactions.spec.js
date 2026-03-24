const { test} = require('@playwright/test');
const sections = require('../pages/pageIndex');
const devices = require("../test_Data/addDeviceOptions.json")

test.describe('@regression Add register and delete register', async () => {
    let context
    let page;
    test.beforeAll('Login with valid credentials', async ({ browser }) => {
        test.setTimeout(60000)
        context = await browser.newContext()
        page = await context.newPage()

        // const loginPage = new sections.LoginPage(page, test)
        // await loginPage.launchAppAndLoginWithValidCredentials();

    });
    test.afterAll('Closing context',async()=>{
         await context.close();
    })

    test('create transactoin',async()=>{
        const lightSpeedPage = new sections.LightSpeedSalePage(page, test);
        const itemsToSelect = ["Coke / 2 ltr","Coke / 500 ml","Chocolate Brownie","Freshly Squeezed Juice"];
        await lightSpeedPage.navigateaToLightSpeedSignInPage();
        await lightSpeedPage.enteruserName();
        await lightSpeedPage.enterPassword();
        await lightSpeedPage.clickSignIn();
        await lightSpeedPage.goToSellTab();
        await lightSpeedPage.selectRegister();
        await lightSpeedPage.selectItems(itemsToSelect);
        await lightSpeedPage.clickPay();
        await lightSpeedPage.receiveRequiredCash();
        await lightSpeedPage.clickCompleteSaleBtn();
        await page.waitForTimeout(parseInt(process.env. Large_WAIT));
        
    })
})