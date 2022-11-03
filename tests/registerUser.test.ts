import test from "@playwright/test";
import Assert from "../app.book.base/asserts";
import RegisterPage from "../app.bookcart.pages/registerPage";
import * as data from "../utils/testdata/registerUser.json";


test("Register User", async ({ page }) => {
    // let's focus without fixtures

    const register = new RegisterPage(page);
    const assert = new Assert(page);
    // this will create unique username always
    const userName = data.userName + Date.now().toString();

    await test.step("Goto application", async () => {
        await register.navigateToRegisterPage();
    })

    await test.step("Create user", async () => {
        await register.registerUser(data.firstName
            , data.lastName, userName, data.password,
            data.confirmPassword, "m");
    });

    await test.step("Confirm register is success", async () => {
        await assert.assertURL("login")
    });

})