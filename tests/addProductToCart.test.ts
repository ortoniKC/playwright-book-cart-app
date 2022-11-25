import { expect, test } from "@playwright/test";
import BooksPage from "../app.bookcart.pages/booksPage";
import HeaderPage from "../app.bookcart.pages/headerPage";
import LoginPage from "../app.bookcart.pages/loginPage";
import * as data from "../utils/testdata/loginUser.json";

//  this is test title
test.describe("Add products to cart", async () => {

    //  then this?
    test("Add a book - Unauthenticated user", async ({ page }) => {
        const books = new BooksPage(page);
        const header = new HeaderPage(page);

        await test.step("Navigate to home", async () => {
            await page.goto("/");
        })

        await test.step("Search for 'All of Us with Wings' and add to cart", async () => {
            await books.addBookToCart("All of Us with Wings");
            const cartValue = await header.getCartValue();
            expect(Number(cartValue)).toBeGreaterThan(0);
        })

    })

    test("Add a book - Authenticated user", async ({ page }) => {
        const books = new BooksPage(page);
        const login = new LoginPage(page);
        const header = new HeaderPage(page);

        await test.step("Navigate to login page", async () => {
            await login.navigateToLoginPage();
        })

        await test.step("login user", async () => {
            await login.loginUser(data.userName, data.password);
            await header.verifyLoginSuccess();
        })
        await test.step("Search and add 'The Hookup' to the cart", async () => {
            await books.addBookToCart("The Hookup");
            const cartValue = await header.getCartValue();
            expect(Number(cartValue)).toBeGreaterThan(0);
        })
        await test.step("logout", async () => {
            await header.logoutUser();
        })

        await test.step("Verify added book is there after login", async () => {
            await login.loginUser(data.userName, data.password);
            await header.verifyLoginSuccess();
            const cartValue = await header.getCartValue();
            expect(Number(cartValue)).toBeGreaterThan(0);
        })
    })
})