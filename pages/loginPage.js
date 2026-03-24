import { expect } from "allure-playwright";

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
        await excuteSteps(this.test, this.username, "fill", " launches the browser and enter the username", user);
    }

    async enterPassword(pass) {
        await excuteSteps(this.test, this.password, "fill", "User enter the password", pass);
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
}
