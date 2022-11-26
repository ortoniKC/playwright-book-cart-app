import { test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';

const urls = ["https://bookcart.azurewebsites.net/",
    "https://bookcart.azurewebsites.net/register",
    "https://bookcart.azurewebsites.net/login",
    "https://bookcart.azurewebsites.net/books/details/2"
];

const options = {
    logLevel: "info",
};
const configs = {
    extends: "lighthouse:default",
    settings: {
        onlyCategories: ["accessibility"],
        onlyAudits: ["largest-contentful-paint",
            "cumulative-layout-shift"],
        skipAudits: ["performance"]
    }
}


test.use({ headless: true })

urls.forEach(url => {




    test("Un-Auth lighthouse: " + url, async ({ playwright }) => {
        const browser = await playwright.chromium.launch({
            args: ['--remote-debugging-port=9222'],
        })
        const context = await browser.newContext();
        const page = await context.newPage()
        await page.goto(url);
        await playAudit({
            opts: options,
            config: lighthouseDesktopConfig,
            thresholds: {
                performance: 50,
                accessibility: 50,
                'best-practices': 50,
                seo: 50,
                pwa: 50,
            },
            ignoreError: true,
            port: 9222,
            page: page,
            reports:
            {
                "formats": {
                    html: true,
                    // csv: true, json: false
                },
                name: "lighthouse-report-" + Date.now().toString(),
                directory: "lighthous-report-desktop"
            },

        });
        await page.close();
        await context.close();
        await browser.close();
    })
});

