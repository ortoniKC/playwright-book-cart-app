import { expect, Page } from "@playwright/test";
import BaseFunctions from "../app.book.base/baseFunctions";
type gender = {
    m: "male",
    f: "female"
}
export default class RegisterPage {

    private base: BaseFunctions;

    constructor(private page: Page) {
        this.base = new BaseFunctions(page);
    }

    private Elements = {
        fName: "input[formcontrolname='firstname']",
        lname: "input[formcontrolname='lastname']",
        userName: "input[formcontrolname='username']",
        password: "input[formcontrolname='password']",
        confirmPassword: "input[formcontrolname='confirmPassword']",
        maleInput: "input[value='Male']",
        femaleInput: "input[value='Female']",
        maleRadioBtn: "//span[contains(text(),'Male')]",
        femaleRadioBtn: "//span[contains(text(),'Female')]",
        regBtn: "button[color='primary']"
    }

    // only for positive scenario

    async registerUser(firstname: string, lastname: string, userName: string,
        password: string, confirmPassword: string,
        gender: gender) {
        await this.page.fill(this.Elements.fName, firstname);
        await this.page.fill(this.Elements.lname, lastname);
        // this must be unique always
        await this.page.fill(this.Elements.userName, userName);
        await this.page.fill(this.Elements.password, password);
        await this.page.fill(this.Elements.confirmPassword, confirmPassword);
        if (gender.m) {
            await this.page.click(this.Elements.maleRadioBtn);
            await expect(this.page.locator(this.Elements.maleInput)).toBeChecked();
        } else {
            await this.page.click(this.Elements.femaleRadioBtn);
            await expect(this.page.locator(this.Elements.femaleInput)).toBeChecked();
        }
        await this.base.navigateTo(this.Elements.regBtn);
    }

}