import { Page } from "@playwright/test";
import Assert from "../app.book.base/asserts";
import BaseFunctions from "../app.book.base/baseFunctions";

export default class LoginPage {

    constructor(private page: Page,
        private base: BaseFunctions) { }

    private Elements = {
        userInput: "Username",
        passwordInput: "Password",
        loginBtn: "button[color='primary']",
        errorMessage: "alert"
    }
    async enterUserName(user: string) {
        await this.page.fill(this.Elements.userInput, user);
    }
    async enterPassword(Password: string) {
        await this.page.fill(this.Elements.passwordInput, Password);
    }

    async clickLoginButton() {
        await this.base.navigateTo(this.Elements.loginBtn);
    }

    getErrorMessage() {
        return this.page.locator(this.Elements.errorMessage);
    }

    async loginUser(user: string, password: string) {
        // await this.assert.assertURL("https://bookcart.azurewebsites.net/login")
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }


}