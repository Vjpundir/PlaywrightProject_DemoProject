class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("input[name='email']");
        this.passwordInput = page.locator("input[name='password']");
        this.siginButton = page.locator('.rw-btn');


    }

    //Method to perform login action
    async login(email, password) {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.siginButton.click();
    }
}

module.exports = { LoginPage };