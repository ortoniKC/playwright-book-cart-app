import { Page } from "@playwright/test";
import Assert from "../app.book.base/asserts";
import BaseFunctions from "../app.book.base/baseFunctions";

export default class LoginPage {
    private base: BaseFunctions
    constructor(private page: Page) {
        this.base = new BaseFunctions(page);
    }

    private Elements = {
        userInput: "Username",
        passwordInput: "Password",
        loginBtn: "button[color='primary']",
        errorMessage: "alert"
    }

    async navigateToLoginPage() {
        await this.base.goto("/login");
    }
    async enterUserName(user: string) {
        await this.page.getByLabel(this.Elements.userInput).fill(user);
        // await this.page.fill(, user);
    }
    async enterPassword(Password: string) {
        await this.page.getByLabel(this.Elements.passwordInput).fill(Password);

        // await this.page.fill(this.Elements.passwordInput, Password);
    }

    async clickLoginButton() {
        // await this.base.navigateTo(this.Elements.loginBtn);
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    getErrorMessage() {
        return this.page.getByRole("alert");
    }

    async loginUser(user: string, password: string) {
        // await this.assert.assertURL("https://bookcart.azurewebsites.net/login")
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }


}