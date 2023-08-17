import { test } from "@playwright/test";

test("Stale Element Demo", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator("id=user-name").fill("standard_user");
    await page.locator("id=password").fill("secret_sauce");
    await page.locator("id=login-button").click();

    const priceDropdown = page.locator("select");
    await priceDropdown.selectOption("lohi");
    const product = page.locator(".inventory_item_name").first();
    console.log(await product.textContent());

    await priceDropdown.selectOption("hilo");
    console.log(await product.textContent());
});