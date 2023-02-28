import { test } from "@playwright/test";


test("Web table sorting", async ({ page }) => {

    await page.goto("https://letcode.in/table");
    const table = page.locator("table.mat-sort.table");

    const desserts = table.locator("th[mat-sort-header='name']");

    const sortType = await desserts.getAttribute("aria-sort");
    // console.log("initial sort type: " + sortType);

    const dessertsRow = page.locator("//table[contains(@class,'mat-sort table')]/tr/td[1]");
    const originalData = await dessertsRow.allTextContents();
    console.log("Original: " + originalData);

    console.log("Ascending -- ");
    await sortTable();
    console.log("Descending -- ");
    await sortTable();
    console.log("None");
    await sortTable();





    async function sortTable() {
        await desserts.click();
        const sort = await desserts.getAttribute("aria-sort");
        if (sort === "descending") {
            console.log("Expecting des -- : " + sort);
            originalData.sort((a, b) => b.localeCompare(a));
            console.log("Exp des -- " + await dessertsRow.allTextContents());
        }
        if (sort === "ascending") {
            console.log("Expecting asc -- : " + sort);
            originalData.sort();
            console.log("Exp acs -- " + await dessertsRow.allTextContents());
        }
        else {
            console.log("Exp none -- " + await dessertsRow.allTextContents());
        }

    }
})