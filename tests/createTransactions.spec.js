const { test} = require('@playwright/test');
const sections = require('../pages/pageIndex');
const devices = require("../test_Data/addDeviceOptions.json")
const { createTransaction } = require("../utilities/CreateTransactions.js");

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

    test.only('create transactoin',async()=>{
        const lightSpeedPage = new sections.LightSpeedSalePage(page, test);
        const itemsToSelect = ["Coke / 2 ltr","Coke / 500 ml","Chocolate Brownie","Freshly Squeezed Juice"];
        lightSpeedPage.navigateaToLightSpeedSignInPage();
        lightSpeedPage.enteruserName();
        lightSpeedPage.enterPassword();
        lightSpeedPage.clickSignIn();
        lightSpeedPage.goToSellTab();
        lightSpeedPage.selectRegister();
        lightSpeedPage.selectItems(itemsToSelect);
        lightSpeedPage.clickPay();
        await this.page.waitForTimeout(parseInt(process.env. Large_WAIT));
    //    await createTransaction(page);
    })
})