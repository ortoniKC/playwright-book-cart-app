import { chromium, test, expect } from "@playwright/test";



test.describe("My awesome test suits", () => {

    test.use({
        viewport: null
    })
    test("My awesome test", async ({ page }, testInfo) => {

        const btn = page.locator("button");
        await expect(btn).toHaveCSS("background-color", "#8a4d76")


    });
    test("My awesome test 2", async ({ page }) => {
    });
    test("My awesome test 3", async ({ page }) => {
    });

})
test("My awesome test", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.letcode.in/");
});