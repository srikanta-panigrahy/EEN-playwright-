const { expect } = require('@playwright/test'); 

const {excuteSteps}  =require("../utilities/actions.js");


export class LoginPage {

    constructor(page, test) {
        this.page = page;
        this.test = test;
        this.username = page.locator("//input[@placeholder='Email']");
        this.password = page.locator('//input[@placeholder="Password"]');
        this.nextButton = page.locator('//button[normalize-space()="Next"]');
        this.signin = page.locator('//button[normalize-space()="Sign in"]');

    }

    async navigateToLoginPage(url) {
        await this.page.goto(url);
        console.log("login")
    }

    async enterUserName(user) {
        // 1. Wait for the element to be visible
        await this.username.waitFor({ state: 'visible', timeout: 5000 });
        
        // 2. Click it to ensure focus (Solves the "skipped input" issue)
        await this.username.click();
        
        // 3. Clear existing text just in case
        await this.username.clear();

        // 4. Input the text (Use "fill" or "type" via your utility)
        await excuteSteps(this.test, this.username, "fill", "User enters username", user);
    }

    async enterPassword(pass) {
       // Ensure password field is actually ready before typing
        await this.password.waitFor({ state: 'visible' });
        await this.password.click();
        await excuteSteps(this.test, this.password, "fill", "User enters password", pass);
    }

    async clickNext() {
        await excuteSteps(this.test, this.nextButton, "click", "click next button");
    }

    async clickSignIn() {
        await excuteSteps(this.test, this.signin, "click", "click sign in button");
    }

    async login(userEmail, UserPassword) {
        await this.enterUserName(userEmail);
        await this.clickNext();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.enterPassword(UserPassword);
        await this.clickSignIn();
        await expect(this.page).toHaveTitle("Eagle Eye Networks",{timeout:10000});
    }

    async launchAppAndLoginWithValidCredentials() {
        // await this.navigateToLoginPage(process.env.BASE_URL);
        await this.enterUserName([process.env.USER_EMAIL]);
        await this.clickNext();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.enterPassword([process.env.USER_PASSWORD]);
        await this.clickSignIn();
    }

     async NonAdminlaunchAppAndLoginWithValidCredentials() {
        // await this.navigateToLoginPage(process.env.BASE_URL);
        await this.enterUserName([process.env.NON_ADMIN_USER]);
        await this.clickNext();
        await this.page.waitForTimeout(parseInt(process.env.SMALL_WAIT));
        await this.enterPassword([process.env.NON_ADMIN_PASSWORD]);
        await this.clickSignIn();
    }
}