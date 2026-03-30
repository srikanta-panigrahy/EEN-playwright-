const { test, expect } = require("@playwright/test");
const { excuteSteps } = require('../utilities/actions.js');

export class SquarePosPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.Username = page.locator("//label[text()='Email or phone number']")
        this.continueBtn = page.getByTestId("login-email-next-button");
        this.password = page.locator('#password')
        this.Singin = page.getByTestId('login-password-submit-button');
        this.incorrectpassword = page.locator("//small[text()='Incorrect password. Please try again.']");
        this.profile = page.locator("(//span[text()='JD'])[1]");
        this.logout = page.locator("//div[text()=' Logout ']");
        this.VerifySingin = page.locator("//h2[text()='Sign in']");
        this.Icon = page.locator("//span[contains(@data-testid,'tooltip')]/following-sibling::span");
        this.textverify = page.getByText('Please sign into Square POS');
        this.VerifyPosSystem = page.locator("//div[text()=' POS system ']");
        this.verifyIntegrationType = page.locator("//div[text()=' Integration type ']");
        this.verifyoauth2 = page.getByTestId('pos-integration-system-auth-type');
        this.VerifyPosSelectionBox = page.getByTestId('pos-integration-system-sign-in-button')
        this.registers=page.locator("//span[text()='POS registers']");
        this.Singintopos=page.locator("//span[text()=' Sign into Lightspeed POS (X-Series) ']")
        this.SelectposSystem=page.getByPlaceholder("Select POS system");


    }

    async EnterUsername() {
        // await excuteSteps(this.test, this.Username, "click")
        await excuteSteps(this.test, this.Username, "fill", "Entering the username", ["een_pos@een.com"]);
    }
    async continue() {
        await excuteSteps(this.test, this.continueBtn, "click", "clicking the continue button")
    }
    async EnterPassword() {
        await excuteSteps(this.test, this.password, "click", "Enter the password");
        await this.password.type('jeevankumar', { delay: 100 });
    }
    async SingInBtn() {
        await excuteSteps(this.test, this.Singin, "dblclick", "Clicking on sing in button")
    }
    async Invalidpassword() {
        await expect(this.incorrectpassword).toBeVisible();
    }

    async verifysingin() {
        await expect(this.SingInBtn).toBeVisible();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));

    }

    async logOutFromVMS() {
        await this.page.goBack()
        await expect(this.profile).toBeVisible();
        await excuteSteps(this.test, this.profile, "click", "clicking on profile");
        await expect(this.logout).toBeVisible();
        await excuteSteps(this.test, this.logout, "click", "Clicking on the logout");


    }

    async iIcon() {
        await expect(this.Icon).toBeVisible();
        await excuteSteps(this.test, this.Icon, "hover", "verifing the text")
    }
    async textVerify() {
        await expect(this.textverify).toBeVisible();
    }

    async PosSystemOptions() {
        // await expect(this.textverify).toBeVisible();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT))
        await expect(this.VerifyPosSystem).toBeVisible();
        await expect(this.verifyIntegrationType).toBeVisible();
        await expect(this.verifyoauth2).toBeVisible();
        await expect(this.VerifyPosSelectionBox).toBeVisible();
    }

    async Logoutfromcurrentpage() {

        await expect(this.profile).toBeVisible();
        await excuteSteps(this.test, this.profile, "click", "clicking on profile");
        await expect(this.logout).toBeVisible();
        await excuteSteps(this.test, this.logout, "click", "Clicking on the logout");
    }

    async RegistersDisableOrNot(){
        // const element=await this.registers.isEnabled();
        // console.log(element);
        await expect(this.registers).toBeDisabled();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT))
        const checking=await excuteSteps(this.test,this.registers,"click")
         await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        expect(checking).toBeFalsy();
    }

    async WithoutSelectingPosIndropDeown(){
        await expect(this.Singintopos).not.toBeVisible();
    }

    async checkingPosIsSelectedOrNot(){
        await expect(this.SelectposSystem).toBeEmpty();
    }
    async selectdropdownpos(){
        await excuteSteps(this.test,this.SelectposSystem,"click")
    }
}