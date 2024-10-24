const LoginPage = require('../pageobjects/login.page');

describe('Login page', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('monokera_aseguradora','cindy.17418191741514', 'Restrepo*812');
        // Verifica que se redirige al dashboard después del login
        await browser.pause(3000);

        const wellcome = await $('#title-dashboard-header');
        await expect(wellcome).toBeDisplayed();
    });

    it('should show error with invalid credentials', async () => {
        await LoginPage.login('monokera_aseguradora','invalid', 'Restrepo*812');
        // Verifica que aparece mensaje de error
        await browser.pause(2000);
        await expect(LoginPage.errorMessage).toBeDisplayed();
    });

});