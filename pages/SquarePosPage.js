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
        this.VerifySingin=page.locator("//h2[text()='Sign in']");
        this.Icon=page.locator("//span[contains(@data-testid,'tooltip')]/following-sibling::span");
        this.textverify=page.getByRole('tooltip')

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
        
        await expect(this.incorrectpassword).toContainText("Incorrect password. Please try again.");

        
        await this.page.goBack()
        await expect(this.profile).toBeVisible();
        await excuteSteps(this.test, this.profile, "click", "clicking on profile");
        await expect(this.logout).toBeVisible();
        await excuteSteps(this.test, this.logout, "click", "Clicking on the logout");
    }

    async verifysingin(){
        await this.VerifySingin.waitFor({state:'visible'});
    }

    async logOutFromVMS(){
        await this.page.goBack()
        await expect(this.profile).toBeVisible();
        await this.profile.waitFor({state:'visible'});
        await excuteSteps(this.test, this.profile, "click", "clicking on profile");
        await expect(this.logout).toBeVisible();
        // await this.logout.waitFor({state:'vsible'})
        await excuteSteps(this.test, this.logout, "click", "Clicking on the logout");

    }

    async iIcon(){
        await expect(this.Icon).toBeVisible();
        await excuteSteps(this.test,this.Icon,"hover","verifing the text")
        
        await expect(this.textverify).toHaveText('Please sign into Square POS');

    }
}