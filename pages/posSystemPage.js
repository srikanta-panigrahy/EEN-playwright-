const { excuteSteps } = require('../utilities/actions.js');
const { expect } = require('@playwright/test');


export class PosSystemPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.POSpageHeadingText = page.locator('//span[starts-with(normalize-space(text()), "POS system")]');
        this.PlusButton = page.getByTestId('pos-registers-sidebar-open-button');
        // this.Addsite = page.getByPlaceholder('Select site');
        this.Addsite = page.getByLabel('Select site');
        // this.Addsite = page.locator('//label[text()="Select site"]'); 
        this.Selectsite = page.locator('//div[text()="test"]');
        this.AddBridge = page.getByLabel('Select Bridge');
        this.selectBridge = page.locator('//div[contains(@class,"content")]//div[text()="711 Test"]');
        this.selectCamera = page.getByLabel('Select camera');
        this.selectCameraFromDropDown = page.locator('//div[contains(@class,v-list-item__title)]//div[contains(text(),"EN-CDUF-004a")]');
        this.posRegistersTab = page.getByTestId('tabs__tab-1-POS registers');
        this.storeAndRegisterFilterBox = page.locator('//input[@data-testid="pos-registers-sidebar-filter-input-box"]');
        this.storeOrRegisterCheckBox = (storeName) => page.locator(`//span[@data-testid="tree-view-${storeName}"]/../span/div`);
        this.btnAddRegisters = page.getByTestId('pos-registers-add-button');
        this.addRegisterpanelCancelBtn = page.getByTestId('sidebar-actions-cancel-btn');
        this.btnDeleteRegister = (registerName) => page.locator(`//div[normalize-space(text())="${registerName}"]/../../../following-sibling::td[3]/button`);
        // this.registerInTable = (registerName) => page.locator(`//div[normalize-space(text())="${registerName}"]`);
        this.btnCancle = page.locator('//button[@data-testid="pos-registers-cancel-button"]');
        this.btnSaveChanges = page.locator('//button[@data-testid="pos-registers-save-changes-button"]');
        this.btnSaveAndExit = page.locator('//button[@data-testid="pos-registers-save-and-exit-button"]');
        this.snackbarMessageTitle = page.locator('//span[@class="snackbar__content--title"]');
        this.snackbarMessageBody = page.locator('//div[@class="snackbar__content--main"]');
        this.posDropdown = page.getByTestId("pos-integration-system-selector")
        this.Squarepos = page.locator("//div[contains(@class,'title') and text()='Square POS']")
        this.singintopos = page.locator("//span[text()=' Sign into Square POS ']")

        this.noMatchingRegister = page.getByTestId('pos-registers-sidebar-no-matching-results');
        this.fieldRequired = page.locator("//div[@class ='v-messages__message']");
        this.addedRegisters = page.locator('//tr//td//*[contains(@data-testid,"pos-registers-table-register-name:")]');
        this.lightSpeedPos = page.locator("//div[contains(@class,'title') and text()='Lightspeed POS (X-Series)']");
        this.signIntoLightSpeedPos = page.locator("//span[text()=' Sign into Lightspeed POS (X-Series) ']");

        this.lightSpeedToolTip = page.locator('//span[text()=" Please sign into Lightspeed POS (X-Series) "] ');
        this.icon = page.locator("//span[contains(@data-testid,'tooltip')]/following-sibling::span[1]");
        this.posIntegrationType = page.getByTestId('pos-integration-system-auth-type');
        this.connectButton = page.getByTestId('pos-integration-system-connect-button');

        this.authSuccessMessage = page.locator("//div[contains(text(),'Successfully Authenticated')]");
        this.webhookStatusIcon = page.locator('//button[@data-testid="pos-integration-system-connect-button"]//following-sibling::div[contains(@class,"success")] | //button[@data-testid="pos-integration-system-connect-button"]//i[contains(@class,"success")]');

    }

    async verifyPosSystemPageAppeard() {
        await expect(this.POSpageHeadingText).toBeVisible();
    }

    async clickPOSRegisterTab() {
        await excuteSteps(this.test, this.posRegistersTab, "click", "clicking POS registers tab");
    }

    async clickPlusIcon() {
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
    async SelectCamera() {
        await excuteSteps(this.test, this.selectCamera, "click", "Click Select camera dropdown");
        await excuteSteps(this.test, this.selectCameraFromDropDown, "click", "Selecting camera from dropdown")
    }

    async SelectStore(storeName) {
        const store = this.storeOrRegisterCheckBox(storeName);
        await excuteSteps(this.test, store, "click", `Selecting Store${store}`);
    }

    async SelectRegister(register) {
        await excuteSteps(this.test, this.storeAndRegisterFilterBox, "fill", "searching register ", [register]);
        const registerCheckbox = this.storeOrRegisterCheckBox(register);
        await excuteSteps(this.test, registerCheckbox, "click", `Selecting Store/Register:${registerCheckbox}`);
    }

    async clickAddRegister() {
        await excuteSteps(this.test, this.btnAddRegisters, "click", "Click Add registers button");
    }
    //delete register from POS System page  //not working
    // async deleteRegister(registerName){  
    //     const deleteBtn = this.btnDeleteRegister(registerName);
    //     if(await deleteBtn.count()>0){
    //         // await expect(this.registerInTable(registerName)).toBeVisible();
    //         await excuteSteps(this.test, deleteBtn, "click", `Click delete register button for register ${registerName}`);
    //         await this.clickSaveChangesBtn();
    //         await this.veifySuccessmessage();
    //     }else{
    //         console.log(`Register ${registerName} not added`);
    //     }  
    // }
    async clickSaveChangesBtn() {
        await excuteSteps(this.test, this.btnSaveChanges, "click", "Click Save Changes button");
    }
    async clickSaveAndExitBtn() {
        await excuteSteps(this.test, this.btnSaveAndExit, "click", "Click Save & Exit button");
    }
    async veifySuccessmessage() {
        // await expect(this.successMessge).toBeVisible();
        await expect(this.snackbarMessageTitle).toHaveText('Success', { timeout: 10000 });
    }
    async searchRegister(register) {
        await excuteSteps(this.test, this.storeAndRegisterFilterBox, "fill", "searching register ", [register]);
    }
    async verifyNomatchingRegisterMessage() {
        await expect(this.noMatchingRegister).toBeVisible();
        await expect(this.noMatchingRegister).toContainText('No matching registers found')
    }
    async cameraRequiresErrorMessage() {
        await expect(this.fieldRequired).toBeVisible();
        await expect(this.fieldRequired).toHaveText('Field is required');
    }
    async clickCancelInAddRegisterPanel() {
        await excuteSteps(this.test, this.addRegisterpanelCancelBtn, "click", "Click Canel in add register panel");
    }

    async registerNotPresent(register) {
        await expect(this.addedRegisters.filter({ hasText: register })).toHaveCount(0);
    }

    async PosDrpDwn() {
        await expect(this.posDropdown).toBeVisible();
        await excuteSteps(this.test, this.posDropdown, "click", "Clicking pos drop down")
    }
    async SingInToPos() {
        await expect(this.singintopos).toBeVisible();
        await excuteSteps(this.test, this.singintopos, "click", "clicking on the entering to pos page");
    }
    async clickOnPos() {
        await expect(this.Squarepos).toBeVisible();
        await excuteSteps(this.test, this.Squarepos, "click", "clicking on the pos");
    }

    // Add these to the constructor in pages/posSystemPage.js


    // Add these methods to the PosSystemPage class
    async selectLightSpeed() {
        await excuteSteps(this.test, this.lightSpeedPos, "click", "Selecting Lightspeed POS (X-Series)");
    }
    async clickSignintoLightSpeed() {
        await excuteSteps(this.test, this.signIntoLightSpeedPos, "click", "Clicking Sign into Lightspeed POS (X-Series)");
    }
    async authticationSuccessMessage() {
        await expect(this.authSuccessMessage).toBeVisible();
    }
    async connectPOS() {
        await excuteSteps(this.test, this.connectButton, "click", "Clicking on the Connect button");
    }
    async verifyWebhookStatusIndicator() {
        await expect(this.webhookStatusIcon).toBeVisible();
    }


}