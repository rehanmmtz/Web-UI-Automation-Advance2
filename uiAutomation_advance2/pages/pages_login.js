import { By } from 'selenium-webdriver';


class LoginPage {
    static inputUsername = By.id("user-name");
    static inputPassword = By.id("password");
    static buttonLogin = By.id("login-button");
}


export default LoginPage;