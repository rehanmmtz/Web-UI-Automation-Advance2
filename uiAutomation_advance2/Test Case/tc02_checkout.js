import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import * as chrome from 'selenium-webdriver/chrome.js'; //atau import chrome from 'selenium-webdriver/chrome';
import * as fs from 'fs'; //atau import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import LoginPage from '../pages/pages_login.js';
import CheckoutPage from '../pages/pages_checkout.js';

describe('Test SAUCEDEMO', function () {
    this.timeout(50000);

    let driver;
    let options = new chrome.Options();
    options.addArguments('--incognito');
    // options.addArguments('--headless');
    options.addArguments('--log-level=3'); // suppress warning/error logs buat ngilangin eror

    beforeEach(async function () { //sebelum test dijalankan buka browser.
        console.log('ini before test');
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        await driver.manage().window().maximize();
        await driver.get('https://www.saucedemo.com/v1/');
    });

    afterEach(async function () { //setelah semua test selesai quit browser.
        console.log('ini after test');
        await driver.sleep(2000);
        await driver.quit();
    });

    it('test checkout', async function () {
        let input = await driver.findElement(LoginPage.inputUsername);
        await input.sendKeys("standard_user");
        let password = await driver.findElement(LoginPage.inputPassword);
        await password.sendKeys("secret_sauce");
        let loginBtn = await driver.findElement(LoginPage.buttonLogin);
        await loginBtn.click();

        let klik = await driver.findElement(CheckoutPage.buttonAddToCart);
        await klik.click();
        let cart = await driver.findElement(CheckoutPage.buttonCart);
        await cart.click();
        let checkout = await driver.findElement(CheckoutPage.buttonCheckout);
        await checkout.click();
        let firstName = await driver.findElement(CheckoutPage.inputFirstName);
        await firstName.sendKeys("swag");
        let lastName = await driver.findElement(CheckoutPage.inputLastName);
        await lastName.sendKeys("labs");
        let postalCode = await driver.findElement(CheckoutPage.inputPostalCode);
        await postalCode.sendKeys("12345");
        let continueBtn = await driver.findElement(CheckoutPage.buttonContinue);
        await continueBtn.click();
        let finishBtn = await driver.findElement(CheckoutPage.buttonFinish);
        await finishBtn.click();

        let ss_sukseschekout = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/checkout/ss_sukseschekout.png', Buffer.from(ss_sukseschekout, 'base64'));
        //assert
        let thankYou = await driver.wait(until.elementLocated(By.className("complete-header")), 50000);
        let selesai = await thankYou.getText();
        assert.strictEqual(selesai, "THANK YOU FOR YOUR ORDER");
    });



});