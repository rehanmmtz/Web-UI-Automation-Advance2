import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import * as chrome from 'selenium-webdriver/chrome.js'; //atau import chrome from 'selenium-webdriver/chrome';
import LoginPage from '../pages/pages_login.js';
import * as fs from 'fs'; //atau import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

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

    it('ini test valid', async function () {
        let input = await driver.findElement(LoginPage.inputUsername);
        await input.sendKeys("standard_user");
        // let ss_kolom_username = await input.takeScreenshot();
        // fs.writeFileSync('report_ss/ss_kolom_username.png', Buffer.from(ss_kolom_username, 'base64'));
        let password = await driver.findElement(LoginPage.inputPassword);
        await password.sendKeys("secret_sauce");
        let loginBtn = await driver.findElement(LoginPage.buttonLogin);
        await loginBtn.click();

        let produk = await driver.wait(until.elementLocated(By.className("product_label")), 50000);
        let isDisplayed = await produk.isDisplayed();
        assert.strictEqual(isDisplayed, true);

        let ss_validlogin = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/login/ss_validlogin.png', Buffer.from(ss_validlogin, 'base64'));
    });

    it("ini test lockedout user", async function () {
        let input = await driver.findElement(LoginPage.inputUsername);
        await input.sendKeys("locked_out_user");
        let password = await driver.findElement(LoginPage.inputPassword);
        await password.sendKeys("secret_sauce");
        let loginBtn2 = await driver.findElement(LoginPage.buttonLogin);
        await loginBtn2.click();

        let ss_lockedoutuser = await driver.takeScreenshot();
        fs.writeFileSync('report_ss/login/ss_lockedoutuser.png', Buffer.from(ss_lockedoutuser, 'base64'));

        //assert
        await driver.wait(until.elementLocated(By.css('h3[data-test="error"]')), 50000);
        let erorWarning = await driver.findElement(By.css('h3[data-test="error"]'));
        let eror = await erorWarning.getText();
        // console.log('locked user error text:', eror);
        assert.strictEqual(eror, "Epic sadface: Sorry, this user has been locked out.");
    });

});    