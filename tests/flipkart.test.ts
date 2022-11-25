import { test } from "@playwright/test";
import HomePage from "../app.flipkart/pages/homePage";
import ResultPage from "../app.flipkart/pages/resultPage";
import SearchResult from "../app.flipkart/pages/searchResult";

test.only("Flipkart - search and add a product to the cart", async ({ page }) => {

    const home = new HomePage(page);
    const search = new SearchResult(page);

    await test.step("Goto app & close the popup", async () => {
        await page.goto("https://www.flipkart.com/");
        await home.closePopup();
    })

    const newTab = await test.step("search for some product", async () => {
        await home.searchFor("realme 9 (Sunburst Gold, 128 GB)");
        return await search.clickFirstResult();
        // const result = new ResultPage(tab);
    })

    await test.step("add the product to the cart", async () => {
        const result = new ResultPage(newTab);
        await result.addToCart();
        await page.waitForTimeout(5000);
    })
})