import { expect, test } from "@playwright/test";
import HeaderPage from "../app.bookcart.pages/headerPage";
import LoginPage from "../app.bookcart.pages/loginPage";
import { playAudit } from "playwright-lighthouse";
import lighthouseDesktopConfig from 'lighthouse/lighthouse-core/config/lr-desktop-config';

import * as data from "../utils/testdata/loginUser.json";

test.describe("Login scenario", async () => {

    // test.use({
    //     storageState: ""
    // })

    test("Valid login & logout", async ({ playwright }) => {
        const browser = await playwright.chromium.launch({
            args: ['--remote-debugging-port=9222'],
        })
        const context = await browser.newContext();
        const page = await context.newPage()
        const login = new LoginPage(page);
        const header = new HeaderPage(page);

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })
        await test.step("login with valid credentials", async () => {
            await login.loginUser(data.userName, data.password);
            await header.verifyLoginSuccess();
        })
        await test.step("Audit", async () => {
            await playAudit({
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
                    "formats": { html: true },
                    name: "lighthouse-report-auth",
                    directory: "lighthous-report" + Date.now().toString()
                },

            });
        })

        await test.step("Logout user", async () => {
            await header.logoutUser();
        })
    })
})