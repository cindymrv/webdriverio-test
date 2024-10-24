class LoginPage {
    // Selectores
    get inputTenant() { return $('#input-tenant') }
    get inputUser() { return $('#input-user') }
    get inputPassword() { return $('#input-password') }
    get btnSubmit() { return $('#submit-button') }
    get errorMessage() { return $('.loginForm_error__message__ZqaNG') }

    // Métodos
    async login(tenant, user, password) {
        await this.inputTenant.setValue(tenant);
        await this.inputUser.setValue(user);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async open() {
        await browser.url('https://new-admin-webapp.qa.monokera.site/login');
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }
}

module.exports = new LoginPage();