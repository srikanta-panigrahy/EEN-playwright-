const { excuteSteps } = require('../utilities/actions.js');
const { expect } = require('@playwright/test');


export class PosSystemPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.POSpageHeadingText = page.locator('//span[starts-with(normalize-space(text()), "POS system")]');
        this.PlusButton = page.getByTestId('pos-registers-sidebar-open-button');
        this.Addsite = page.getByPlaceholder('Select Site');
        this.Selectsite = page.locator('//div[text()="Dont delete"]'); 
        this.AddBridge = page.getByLabel('Select Bridge');
        this.selectBridge = page.locator('//div[contains(@class,"content")]//div[text()="711 Test"]');
    }

    async verifyPosSystemPageAppeard() {
        await expect(this.POSpageHeadingText).toBeVisible();
    }

    async clickPlusIcon(){
        await excuteSteps(this.test, this.PlusButton, "click", "clicking plus Icon to open add register side panel");
    }
    async SelectSite() {
        await excuteSteps(this.test, this.Addsite, "click", "addsite");
        await excuteSteps(this.test, this.Selectsite, "click", "selecting the site");
    }

    async SelectBridge() {
        await excuteSteps(this.test, this.AddBridge, "click", "Selecting bridge")
        await excuteSteps(this.test, this.selectBridge, "click", "Selecting bridge");
    }
}