import { test } from "@playwright/test";
import XLSX from "xlsx";


test("Download & Compare excel file data", async ({ page }, testInfo) => {

    await page.goto("https://letcode.in/file");
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        await page.locator("//a[contains(text(),'Download Excel')]").click()
    ]);
    const path = download.suggestedFilename();
    await download.saveAs(path);
    await testInfo.attach('downloaded', { path: path });

    const workbook = XLSX.readFile(path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const jsonSheet = XLSX.utils.sheet_to_json(sheet);
    console.log(jsonSheet);


})