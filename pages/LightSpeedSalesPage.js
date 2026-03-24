const{test,expect}=require("@playwright/test");

export class LightSpeedSalePage{
    constructor(page,test){
        this.page = page
        this.test = test
        this.userName = page.locator("[name='username']");
        this.password = page.locator("[name='password']");
        this.signInBtn = page.getByTestId("signin");
        this.sellLabel = page.locator('[data-testid="SidebarNavItemLabel"]', { hasText: 'Sell' });
        this.mainOutle = page.locator("//button[normalize-space()='Main Outlet']");
        this.registerSeven  = page.locator("//h3[normalize-space()='Main Outlet - Register 7']");
        this.availableItems = page.locator("//span[@class='vd-quick-key-label']");
        this.payBtn = page.locator('//button[@data-testid="pay-btn"]');
        this.cashPayment = page.locator('[data-id ="1"]');
        this.receiveBilledAmount = page.locator('//button[@data-track="collect-cash"]');
        this.completeSaleBtn = page.getByTestId('complete-action-button')
            
    }
    async navigateaToLightSpeedSignInPage(){
        await this.page.goto(process.env.LIGHTSPEED_URL);
        await expect(this.page).toHaveURL(/signin/);
    }
    async enteruserName(){
        await this.userName.fill(process.env.LS_USERNAME);
        await expect(this.userName).toHaveValue(process.env.LS_USERNAME);

    }
    async enterPassword(){
        await this.password.fill(process.env.LS_PASSWORD);
        await expect(this.password).toHaveValue(process.env.LS_PASSWORD);
    }
    async clickSignIn(){
        await this.signInBtn.click();
        await this.page.waitForTimeout(parseInt(process.env. MEDIUM_WAIT));
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

    async receiveRequiredCash(){
        await this.cashPayment.click();
        await this.receiveBilledAmount.click();
    }
    async clickCompleteSaleBtn(){
        await this.completeSaleBtn.click();
    }
}


