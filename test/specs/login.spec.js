const LoginPage = require('../pageobjects/login.page');

describe('Login page', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('monokera_aseguradora','cindy.17418191741514', 'Restrepo*812');
        await browser.pause(3000);

        const wellcome = await $('#title-dashboard-header');
        await expect(wellcome).toBeDisplayed();
    });

    it('should show error with invalid credentials', async () => {
        await LoginPage.login('monokera_aseguradora','invalid', 'Restrepo*812');
        await browser.pause(2000);
        await expect(LoginPage.errorMessage).toBeDisplayed();
    });

    it('should set the correct values during login', async () => {
        const tenant = 'monokera_aseguradora';
        const user = 'cindy.17418191741514';
        const password = 'Restrepo*812';

        await LoginPage.login(tenant, user, password);

        const tenantValue = await LoginPage.inputTenant.getValue();
        const userValue = await LoginPage.inputUser.getValue();
        const passwordValue = await LoginPage.inputPassword.getValue();

        expect(tenantValue).to.equal(tenant);
        expect(userValue).to.equal(user);
        expect(passwordValue).to.equal(password);
    });
});