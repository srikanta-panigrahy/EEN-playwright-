
const { test, expect } = require('@playwright/test');
const { excuteSteps } = require("../utilities/actions.js");

export class DashboardPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.Dashboard = page.locator('//div[text()=" Dashboard "]')
        this.Devices = page.locator('//div[contains(@class,"page-title__name") and normalize-space()="Devices"]')
        this.btnAddDevice = page.locator('//button[normalize-space()="Add device"]')
        this.addDeviceOptionsLayout = page.locator("//div[@role='menu' and contains(@class,'drop-down-menu')]");
        this.PosSystems = page.locator('//div/div[normalize-space()="POS systems"]')
        this.NoOfPos = page.locator('//div[@data-testid="pos-systems-table"]//table//tbody')
        this.lightSpeedCababmenu = page.locator('//div[contains(@class,"device-action-button") and contains(@data-testid,"pos-systems-table-dropdown-menu:lightspeed-x")]');
        this.Settings = page.getByTestId('Settings');
        this.editRegisters = page.getByTestId('Edit registers');
        this.deleteSystem = page.getByTestId('Delete system');
        this.addPosButton = page.getByTestId('Add POS system')
        this.addDevice = (devicetype) => page.getByTestId(devicetype);
        this.squarePOSExpandBtn = page.locator('//*[@data-testid="pos-systems-table-system-name:square"]//div[contains(@class,"icon-wrapper")]')
        this.lightSpeedPOSExpandBtn = page.locator('//*[@data-testid="pos-systems-table-system-name:lightspeed-x"]//div[contains(@class,"icon-wrapper")]')
        this.registerName = (register) => page.locator(`//td[normalize-space()="${register}"]`);
        this.registerMenu = (register) => page.locator(`//td[normalize-space()="${register}"]/../td[7]`);
        this.deleteRegisterTxt = page.locator('//div[@data-testid="Delete register"]');
        this.deleteRegisterBtnInDialogueBox = page.locator('//button[normalize-space(text())="Delete register"]');
        this.deleteRegisterDialogueBox = page.locator('//div[contains(@class,"v-dialog--active")]');
        this.registerDeletedMessagebox = page.locator('//div[@class="snackbar__content--main"]');
        this.availableRegistersThreeDotMenu = page.locator('//div[contains(@data-testid,"pos-systems-table-expanded-row-dropdown-menu:")]');
        this.deleteSystemDialogBox = page.locator('//div[contains(@class,"v-dialog--active")]');
        this.deleteSystemBtn = page.locator("//button[text()=' Delete system ']");
    }


    async GotoDashboardPage() {
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await excuteSteps(test, this.Dashboard, "click", "clicking on the dashboard")


    }
    async DevicesPage() {
        // await expect(this.Devices).toBeVisible();
        // console.log("Device is visible");
        await this.Devices.waitFor({ state: 'visible' });
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

    async kabebMenuAnd() {
        // await this.cababmenu.scrollIntoViewIfNeeded();
        // await this.cababmenu.first().waitFor({state:'visible'});
        await excuteSteps(test, this.lightSpeedCababmenu, "click", "click on the Light Speed kabeb menu");
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
    async clickAddDeviceButton() {
        await expect(this.btnAddDevice).toBeVisible();
        await excuteSteps(test, this.btnAddDevice, "click", "click on Add device button");
        // await this.btnAddDevice.click();
        await expect(this.addDeviceOptionsLayout).toBeVisible();
    }
    async selectDeviceTypeInAddDevice(deviceType) {
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT)); //need to remove hard wait
        await this.clickAddDeviceButton();
        await excuteSteps(test, this.addDevice(deviceType), "click", `click ${deviceType} in Add devices options`);
    }

    async verifyRegisterExistInPosSytem(registerName) {
        const register = this.registerName(registerName)
        await expect(register).toBeVisible();
    }
    async verifyRegisterShouldNotExistInPosSytem(registerName) {
        const register = this.registerName(registerName)
        await expect(register).not.toBeVisible();
    }
    async deleteRegister(registerName) {
        await this.registerMenu(registerName).click();
        await this.deleteRegisterTxt.click();
        await expect(this.deleteRegisterDialogueBox).toContainText(`You are about to delete the register ${registerName}. It will be deleted from your dashboard`);
        await this.deleteRegisterBtnInDialogueBox.click();
        await expect(this.registerDeletedMessagebox).toBeVisible();
        await expect(this.registerDeletedMessagebox).toContainText(`The register ${registerName} was successfuly removed from Dashboard`);
    }


    async expandSquaewPOSSystem() {
        await excuteSteps(test, this.squarePOSExpandBtn, "click", "Expand Square POS panel");
    }
    async expandLightSpeedPOSSystem() {
        await excuteSteps(test, this.lightSpeedPOSExpandBtn, "click", "Expand light speed POS panel");
    }

    async deleteAllAddedRegisters() {
        const registers = this.availableRegistersThreeDotMenu;
        const expandBtn = this.lightSpeedPOSExpandBtn;

        if (await expandBtn.count() > 0) {
            this.expandLightSpeedPOSSystem();
            const count = await registers.count();
            for (let i = 0; i < count; i++) {
                const eachRegister = registers.nth(i);
                await eachRegister.click();
                await this.deleteRegisterTxt.click();
                //await expect(this.deleteRegisterDialogueBox).toContainText('You are about to delete the register');
                await this.deleteRegisterBtnInDialogueBox.click();
                //await expect(this.registerDeletedMessagebox).toBeVisible();
                //await expect(this.registerDeletedMessagebox).toContainText('was successfuly removed from Dashboard');
            }
        } else {
            console.log('No registers present in Dashboard page for LIght speed POS');
        }
    }
    async addposbutton() {

        await excuteSteps(this.test, this.addPosButton, "click", "Clicking On pos Button");

    }

    async cababMenuOptions() {
        await expect(this.editRegisters).toBeVisible();
        await expect(this.deleteSystem).toBeVisible();
        await expect(this.Settings).toBeVisible();
    }

    async deleteLightSpeedPOSSystem() {
        await excuteSteps(test, this.deleteSystem, "click", "Click Delete System");
        await expect(this.deleteSystemDialogBox).toBeVisible();
        await expect(this.deleteSystemDialogBox).toContainText('Delete system');
        await expect(this.deleteSystemDialogBox).toContainText('You are about to delete the integration Lightspeed POS (X-Series). It will be deleted from your dashboard');
        await excuteSteps(test, this.deleteSystemBtn, "click", "Click Delete System button in dialog box");

    }

    // Add these to the DashboardPage class
async navigateToPOSTransactions() {
    const posTransactions = this.page.locator('//div[normalize-space()="POS-Transactions"]');
    await excuteSteps(test, posTransactions, "click", "Navigating to POS-Transactions");
}
async navigateHistoryBrowser() {
    const historyBrowser = this.page.locator('//div[normalize-space()="History browser"]');
    await excuteSteps(test, historyBrowser, "click", "Navigating to history browser");
}

}


