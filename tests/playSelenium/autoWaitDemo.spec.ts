import { test } from "@playwright/test";

test("Stale Element Demo", async ({ page }) => {
    await page.goto("https://www.letcode.in/signin");
    await page.locator("[name='email']").fill("koushik1@letcode.in");
    await page.locator("[name='password']").fill("Pass123$");
    await page.locator("//button[text()='LOGIN']").click();
    await page.locator("//a[contains(text(),'Sign out')]").click();
});