const { defineConfig } = require("cypress");
const { configureVisualRegression } = require("cypress-visual-regression");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // Attach the visual regression plugin
            configureVisualRegression(on);
            return config;
        },
        env: {
            visualRegressionType: "base", // default mode (can override with CLI)
        },
        screenshotsFolder: "cypress/snapshots/actual", // actual run images
    },
});
