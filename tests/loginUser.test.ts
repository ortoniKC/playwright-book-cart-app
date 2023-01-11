import { expect, test } from "@playwright/test";
import HeaderPage from "../app.bookcart.pages/headerPage";
import LoginPage from "../app.bookcart.pages/loginPage";
const CryptoJS = require("crypto-js")

import * as data from "../utils/testdata/loginUser.json";

test.describe("Login scenario", async () => {

    test.only("Invalid login", async ({ page }) => {

        const login = new LoginPage(page);

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })

        await test.step("Enter valid username and invalid password", async () => {
            await login.loginUser(data.userName, data.invalidPassword);
            const msg = login.getErrorMessage();
            await expect(msg).toBeVisible();
            await expect(msg).toHaveText(data.errorMsg);
        })

        await test.step("Enter invalid username and valid password", async () => {
            await login.loginUser(data.invalidUserName, data.password);
            const msg = login.getErrorMessage();
            await expect(msg).toBeVisible();
            await expect(msg).toHaveText(data.errorMsg);
        })

        await test.step("Enter invalid username and invalid password", async () => {
            await login.loginUser(data.invalidUserName, data.invalidPassword);
            const msg = login.getErrorMessage();
            await expect(msg).toBeVisible();
            await expect(msg).toHaveText(data.errorMsg);
        })

    })

    test("Valid login & logout", async ({ page }) => {
        const login = new LoginPage(page);
        const header = new HeaderPage(page);

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })
        await test.step("login with valid credentials", async () => {
            await login.loginUser(getDecryptedValue(data.userName),
                getDecryptedValue(data.password));
            await header.verifyLoginSuccess();
        })
        await test.step("Logout user", async () => {
            await header.logoutUser();
        })
    })
})

function getDecryptedValue(data: string) {
    var decrypted = CryptoJS.AES.decrypt(data, process.env.SECRET_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
