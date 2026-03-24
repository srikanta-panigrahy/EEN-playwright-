const{test,expect}=require("@playwright/test");
const { excuteSteps } = require('../utilities/actions.js');

export class LightSpeedSalePage{
    constructor(page,test){
        this.page = page
        this.test = test
        this.userName = page.locator("[name='username']");
        this.password = page.locator("[name='password']");
        this.loginBtn = page.getByTestId("signin");
        this.sellLabel = page.locator('[data-testid="SidebarNavItemLabel"]', { hasText: 'Sell' });
        this.mainOutle = page.locator("//button[normalize-space()='Main Outlet']");
        this.registerSeven  = page.locator("//h3[normalize-space()='Main Outlet - Register 7']");
        this.availableItems = page.locator("//span[@class='vd-quick-key-label']");
        this.payBtn = page.getByTestId("pay-btn")
        this.cashBtn=page.locator("(//button[contains(@class,'vd-btn--jumbo')])[2]");
        this.cashInputBox=page.getByPlaceholder("0.00")

        this.storeUrlinputBox = page.locator('//input[@placeholder="Enter your store URL"]');
        this.nextBtn = page.locator('//button[@type="submit"]');
        this.approveInstallationBtn = page.locator('//button[@data-track="connect-app"]');
        
            
    }
    async navigateaToLightSpeedSignInPage(){
        await this.page.goto(process.env.LIGHTSPEED_URL);
        await expect(this.page).toHaveURL(/signin/);
    }

    async navigateToSquareSingInPage(){
        // await this.page.goto(process.env.SQUARE_URL);
        
        await expect(this.page).toHaveTitle("Square: Sign in to Your Dashboard & Manage your Business")
    }
    async enteruserName(){
        await excuteSteps(this.test, this.userName, "fill", "Entering the username", [process.env.LS_USERNAME]);
        await expect(this.userName).toHaveValue(process.env.LS_USERNAME)

    }
    async enterPassword(){
        await excuteSteps(this.test, this.password, "fill", "Entering the password", [process.env.LS_PASSWORD]);
        await expect(this.password).toHaveValue(process.env.LS_PASSWORD);
    }
    async clickLogin(){
        await this.loginBtn.click();
        // await this.page.waitForTimeout(parseInt(process.env. MEDIUM_WAIT));
    }
    async goToSellTab(){
        await this.sellLabel.click();
        await this.page.waitForTimeout(parseInt(process.env. MEDIUM_WAIT));
    }

    async selectRegister(){
        await this.mainOutle.click();
        await this.registerSeven.click();
        await this.page.waitForTimeout(parseInt(process.env. SMALL_WAIT));
    }

    async selectItems(itemNames) {
        const items = this.availableItems;
        const itemsTexts = await items.allTextContents();

        for (let name of itemNames) {
            for (let i = 0; i < itemsTexts.length; i++) {
                if (itemsTexts[i].includes(name)) {
                    await items.nth(i).click();
                    break;
                }
            }
        }
    }
    async clickPay(){
        await expect(this.payBtn).toBeVisible();
        await this.payBtn.click();
    }
    async CashButton(){
        await expect(this.cashBtn).toBeVisible();
        await this.cashBtn.click();
    }

    async enterStoreUrl(){
        await this.storeUrlinputBox.fill('eagleeyenetworks')
        await this.nextBtn.click();
    }
    async loginToLightSpeeed(){
        await this.enterStoreUrl();
        await this.enteruserName();
        await this.enterPassword();
        await this.clickLogin();
        await this.page.waitForTimeout(parseInt(process.env. SMALL_WAIT));
    }
    async accpetInstallation(){
        await this.page.waitForTimeout(parseInt(process.env. SMALL_WAIT));
        await expect(this.approveInstallationBtn).toBeVisible();
        await this.approveInstallationBtn.click();
        await expect(this.approveInstallationBtn).not.toBeVisible();
        await this.page.waitForTimeout(parseInt(process.env. MEDIUM_WAIT));
    }
}


