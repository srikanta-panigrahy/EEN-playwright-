const { test, expect } = require('@playwright/test');
const {excuteSteps}  =require("../utilities/actions.js");

export class DashboardPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.Dashboard = page.locator('//div[text()=" Dashboard "]')
        this.Devices = page.locator('//div[contains(@class,"page-title__name") and normalize-space()="Devices"]')
        this.btnAddDevice = page.locator('//button[normalize-space()="Add device"]')
        this.addDeviceOptionsLayout= page.locator("//div[@role='menu' and contains(@class,'drop-down-menu')]");

        this.PosSystems = page.locator('//div/div[normalize-space()="POS systems"]')
        this.NoOfPos = page.locator('(//div[@class="v-data-table__wrapper"])[7]//tbody')
        this.cababmenu = page.getByTestId('pos-systems-table-dropdown-menu:lightspeed-x');
        this.addDeviceEle = (devicetype)=> page.getByTestId(devicetype);
    }

    async GotoDashboardPage() {
        await excuteSteps(test,this.Dashboard,"click","clicking on the dashboard")
        await expect(this.Dashboard).toBeVisible();
    }
    async DevicesPage() {
        await expect(this.Devices).toBeVisible();
        console.log("Device is visible");
    }
    async ScrollToPos() {
        await this.PosSystems.scrollIntoViewIfNeeded();
        console.log("posSystem is visible")
        await expect(this.PosSystems).toBeVisible();
    }
    async ListOfPos(ele) {
        const poss = await this.NoOfPos.elementHandles();
        for (const pos of poss) {
            const title = await pos.title();
            console.log(title)
            if (title == 'Lightspeed POS (X-Series)') {
                await this.cababmenu.click();
            }
        }

    }

    async clickAddDeviceButton(){
        await expect(this.btnAddDevice).toBeVisible(); 
        await this.btnAddDevice.click();
        await expect(this.addDeviceOptionsLayout).toBeVisible();
    }
    async selectDeviceTypeInAddDevice(deviceType){
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.clickAddDeviceButton();
        await this.addDeviceEle(deviceType).click();
    }
    

    
}