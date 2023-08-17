import { expect, test } from "@playwright/test";

test("Web-first assertion demo", async ({ page }) => {

    // page related
    await page.goto("https://letcode.in/edit")

    // Custome expect message

    // locator related

    // not recommended way

    // Negating Matchers

    // soft assert


    // await page.goto("https://letcode.in/buttons")

    // await page.goto("https://letcode.in/dropdowns")

    // await page.goto("https://letcode.in/radio")


    // toast
    // await page.goto("https://letcode.in/signin")

})