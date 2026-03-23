const{test,expect}=require("@playwright/test");

async function createTransaction(page){
    
    await page.goto(process.env.LIGHTSPEED_URL);
    await expect(page).toHaveURL(/signin/);

    const username=page.locator("[name='username']")
    await username.fill(process.env.LS_USERNAME);
    await expect(username).toHaveValue("jayakrishnan.gk@een.com")

    const password=page.locator("[name='password']")
    await password.fill(process.env.LS_PASSWORD);
    await expect(password).toHaveValue("Lightspeedtest123")

    await page.getByTestId("signin").click();
    await page.waitForTimeout(parseInt(process.env. MEDIUM_WAIT));
    await page.locator('[data-testid="SidebarNavItemLabel"]', { hasText: 'Sell' }).click();
    //*[contains(@data-testid,"SidebarNavItemLabel") and contains(normalize-space(text()), "Sell")]
    // await page.goto("https://eagleeyenetworks.retail.lightspeed.app/webregister/");
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    
    await page.locator("//button[normalize-space()='Main Outlet']").click();
    await page.locator("//h3[normalize-space()='Main Outlet - Register 7']").click();
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    
    // await page.locator("//span[@class='vd-quick-key-label']", {hasText: "Coke / 2 ltr"}).click();
    const items = page.locator("//span[@class='vd-quick-key-label']");
    const texts = await items.allTextContents();

    for (let i = 0; i < texts.length; i++) {
        if (texts[i].includes("Coke / 2 ltr")) {
            await items.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
    // for(const item of items.count()){
    //     if(item.textcontent("Coke / 2 ltr"))
    //         page.item.click();
    // }
    
}
module.exports = { createTransaction };

