import { Page } from "@playwright/test";

export default class ResultPage {
    constructor(private page: Page) { }

    private Elements = {
        addToCartBtn: "//button[text()='ADD TO CART']"

    }

    async addToCart() {
        await this.page.click(this.Elements.addToCartBtn);
    }
}