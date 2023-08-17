import { test, expect } from "@playwright/test";

test("Better assertion demo", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.locator("//button[text()='✕']").click();
    await page.locator("//div[text()='Mobiles']").click();
    await expect(page).toHaveTitle("Mobile Phones Online at Best Prices in India");
});