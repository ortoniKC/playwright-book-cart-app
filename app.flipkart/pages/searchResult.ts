import { Page } from "@playwright/test";
import BaseFunctions from "../../app.book.base/baseFunctions";
export default class SearchResult {

    constructor(private page: Page) {
    }

    private Elements = {
        firstResult: "div[data-id='MOBGDYSHHVWMECHS'] div a"
    }

    async clickFirstResult() {
        const [newtab] = await Promise.all([
            this.page.waitForEvent("popup"),
            this.page.click(this.Elements.firstResult)
        ]);
        return newtab;
    }
}