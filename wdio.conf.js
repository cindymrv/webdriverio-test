const allure = require('@wdio/allure-reporter').default;

exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    // Máximo de instancias paralelas globales
    maxInstances: 10,
    capabilities: [{
        // Máximo de instancias paralelas por navegador
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: false
    }],
    logLevel: 'info',
    baseUrl: 'https://new-admin-webapp.qa.monokera.site',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true,
            useCucumberStepReporter: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // Hooks
    before: function (capabilities, specs) {
        browser.maximizeWindow();
    },
    beforeTest: function (test) {
        allure.addFeature(test.parent);
        allure.addStory(test.title); // Inicia un paso con el nombre del test
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const screenshot = await browser.takeScreenshot();
            await allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
        }
        allure.addStep(test.title, passed ? 'passed' : 'failed'); // Agregar estado del paso
    },
}