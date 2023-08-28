const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager')

let browser;
let context;
let page;
let loginPageTest;

test.describe('Test the-internet app home page', () => {


    test.beforeEach(async ({browser}) => {

        context = await browser.newContext();
        page = await context.newPage();
        const poManager = new POManager(page);
        loginPageTest = poManager.getLoginPage();
        await loginPageTest.launchWebsite();
    });

    test.afterEach(async () => {
        
        await context.close();
        
    });

    test.afterAll(async () => {
        if (browser) {
            await browser.close(); // Close the browser if it's defined
        }
    });


    test('Valid user login test', async ({ browser }) => {

        await loginPageTest.fetchLoginDetails();
        await loginPageTest.validUserLogin();
    })


    test('Invalid user login test', async ({ browser }) => {

        const errorMsg = await loginPageTest.inValidUserLogin("dhareene", "dharu");
        expect(errorMsg).toEqual("Invalid credentials");

    })


    test('Forget password process test', async ({ browser }) => {

        const forgetMsg = await loginPageTest.resetPassword("dhareene98@gmail.com");
        expect(forgetMsg).toContain("A reset password link has been sent to you via email.");
    });


});