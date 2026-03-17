
const { test, expect } = require('@playwright/test');
const { excuteSteps } = require("../utilities/actions.js");

export class DashboardPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.Dashboard = page.locator('//div[text()=" Dashboard "]')
        this.Devices = page.locator('//div[contains(@class,"page-title__name") and normalize-space()="Devices"]')
        this.btnAddDevice = page.locator('//button[normalize-space()="Add device"]')
        this.addDeviceOptionsLayout= page.locator("//div[@role='menu' and contains(@class,'drop-down-menu')]");

        this.PosSystems = page.locator('//div/div[normalize-space()="POS systems"]')
        this.NoOfPos = page.locator('//div[@data-testid="pos-systems-table"]//table//tbody')
        this.cababmenu = page.locator('//div[contains(@class,"device-action-button") and contains(@data-testid,"pos-systems-table-dropdown-menu:l")]');
        this.Settings = page.getByTestId('Settings');
        this.addDevice = (devicetype)=> page.getByTestId(devicetype);
        this.squarePOSExpandBtn = page.locator('//*[@data-testid="pos-systems-table-system-name:square"]//div[contains(@class,"icon-wrapper")]')
        this.registerMenu = (register)=> page.locator(`//td[normalize-space()="${register}"]/../td[7]`);
        this.deleteRegisterTxt = page.locator('//div[@data-testid="Delete register"]');
        this.deleteRegisterBtnInDialogueBox = page.locator('//button[normalize-space(text())="Delete register"]');
        this.deleteRegisterDialogueBox = page.locator('//div[contains(@class,"v-dialog--active")]');
        this.registerDeletedMessagebox = page.locator('//div[@class="snackbar__content--main"]');
    }

    async GotoDashboardPage() {
        await this.Dashboard.first().waitFor({state: 'visible'}); //this will wait for the specified element in dom
        await excuteSteps(test, this.Dashboard, "click", "clicking on the dashboard")
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
        await excuteSteps(test, this.PosSystems, "click", "clicking the pos")
    }
    async SettingClick() {
        await excuteSteps(test, this.Settings, "click", "clicking on the settings")
    }

    async kabebMenuAnd(){
        // await this.cababmenu.scrollIntoViewIfNeeded();
        // await this.cababmenu.first().waitFor({state:'visible'});
        await excuteSteps(test,this.cababmenu,"click","click on the kabeb menu");
    }
    async ListOfPos() {
        const poss = this.NoOfPos;   // locator
        const count = await poss.count();
        console.log(count)

        for (let i = 0; i < count; i++) {
            const title = await poss.nth(i).textContent();
            console.log(title);
        }
    }
    async clickAddDeviceButton(){
        await expect(this.btnAddDevice).toBeVisible(); 
        await excuteSteps(test,this.btnAddDevice,"click","click on Add device button");
        // await this.btnAddDevice.click();
        await expect(this.addDeviceOptionsLayout).toBeVisible();
    }
    async selectDeviceTypeInAddDevice(deviceType){
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT)); //need to remove hard wait
        await this.clickAddDeviceButton();
        await excuteSteps(test,this.addDevice(deviceType),"click",`click ${deviceType} in Add devices options`);
    }

    async verifyRegisterExistInSquarePOS(registerName){
        await excuteSteps(test,this.squarePOSExpandBtn,"click","click on expand btn for square POS ");
        // await this.squarePOSExpandBtn.click();
    }
    async deleteRegister(registerName){
        await this.registerMenu(registerName).click();
        await this.deleteRegisterTxt.click();
        expect(this.deleteRegisterDialogueBox).toContainText('You are about to delete the register');
        await this.deleteRegisterBtnInDialogueBox.click();
        await expect(this.registerDeletedMessagebox).toBeVisible();
        await expect(this.registerDeletedMessagebox).toContainText('was successfuly removed from Dashboard');
    }
}


