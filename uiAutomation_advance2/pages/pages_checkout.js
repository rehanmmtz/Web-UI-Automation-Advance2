import { By } from 'selenium-webdriver';

class CheckoutPage {
    static buttonAddToCart = By.className("btn_primary btn_inventory");
    static buttonCart = By.className("svg-inline--fa fa-shopping-cart fa-w-18 fa-3x");
    static buttonCheckout = By.className("btn_action checkout_button");
    static inputFirstName = By.id("first-name");
    static inputLastName = By.id("last-name");
    static inputPostalCode = By.id("postal-code");
    static buttonContinue = By.className("btn_primary cart_button");
    static buttonFinish = By.className("btn_action cart_button");
}


export default CheckoutPage;
