import { expect, Page } from "@playwright/test";
import BaseFunctions from "../app.book.base/baseFunctions";

export default class HeaderPage {
    private base: BaseFunctions;
    constructor(private page: Page
    ) {
        this.base = new BaseFunctions(page);
    }

    private headerPageElements = {
        searchInput: "Search books or authors",
        cartBtn: "button.mat-focus-indicator.mat-icon-button",
        cartValue: "#mat-badge-content-0",
        loginLink: "//span[text()='Login']/..",
        userMenu: "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]",
        myOrder: "//button[text()='My Orders' and @role='menuitem']",
        logoutLink: "//button[text()='Logout' and @role='menuitem']"
    }


    async enterBookName(bookname: string) {
        await this.page.getByPlaceholder(this.headerPageElements.searchInput)
            .type(bookname);
        await this.base.waitAndClick("mat-option[role='option']");

    }

    async clickOnCart() {
        await this.page.click(this.headerPageElements.cartBtn);
    }

    async getCartValue() {
        // TODO: have to implement wait for text
        await this.page.waitForTimeout(1000); // temp solution
        return await this.page.textContent(this.headerPageElements.cartValue)
    }

    async clickLoginLink() {
        await this.base.navigateTo(this.headerPageElements.loginLink);
    }

    async clickOnUserMenu() {
        await this.base.waitAndClick(this.headerPageElements.userMenu);
    }

    async clickOnMyOrder() {
        await this.clickOnUserMenu();
        await this.base.waitAndClick(this.headerPageElements.myOrder)
    }

    async logoutUser() {
        await this.clickOnUserMenu();
        await this.base.navigateTo(this.headerPageElements.logoutLink)
    }

    async verifyLoginSuccess() {
        await expect(this.page.locator(this.headerPageElements.userMenu))
            .toBeVisible();
    }
}