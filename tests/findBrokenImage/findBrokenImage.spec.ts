import { expect, test } from "@playwright/test";

test("Find broken image", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/broken_images");
    await page.waitForLoadState("domcontentloaded");
    const images = page.locator("img");
    console.log(await images.count());
    const allImages = await images.all();
    for await (const img of allImages) {
        const imgSrc = await img.getAttribute("src");
        expect.soft(imgSrc?.length).toBeGreaterThan(1);
        //@ts-ignore
        if (imgSrc?.length > 1) {
            const res = await page.request.get("https://the-internet.herokuapp.com/" + imgSrc);
            expect.soft(res.status(), "Failed to load: " + imgSrc).toBe(200);
        }
    }
})