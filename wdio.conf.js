const allure = require('allure-commandline');

exports.config = {
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true
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
            addConsoleLogs: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    //
    // Hooks
    before: function (capabilities, specs) {
        browser.maximizeWindow();
    },
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const screenshot = await browser.takeScreenshot();
            await allure.attachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
        }
    },
}