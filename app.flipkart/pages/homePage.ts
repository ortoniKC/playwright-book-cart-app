import { Page } from "@playwright/test";
export default class HomePage {

    constructor(private page: Page) { }

    private Elements = {
        popupClose: "//button[.='✕']",
        search: "Search for products, brands and more"
    }

    async closePopup() {
        await this.page.locator(this.Elements.popupClose).click();
    }

    async searchFor(search: string) {
        const searchIp = this.page.getByTitle(this.Elements.search);
        await searchIp.type(search);
        await searchIp.press("Enter");
    }
}