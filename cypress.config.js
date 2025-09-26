const { defineConfig } = require("cypress");
const { configureVisualRegression } = require("cypress-visual-regression");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
const fs = require("fs");

module.exports = defineConfig({
    projectId: '7kwdbw',
    e2e: {
        setupNodeEvents(on, config) {
            // Mochawesome reporter
            require("cypress-mochawesome-reporter/plugin")(on);

            // Visual Regression
            configureVisualRegression(on);

            // Tasks (downloads, saving files, etc.)
            on("task", {
                downloadFile,
                saveBase64File({ fileName, base64String }) {
                    fs.writeFileSync(fileName, base64String, "base64");
                    return null;
                },
            });

            return config;
        },

        // Reporter settings
        reporter: "cypress-mochawesome-reporter",
        reporterOptions: {
            reportDir: "cypress/reports",
            overwrite: false,
            html: true,
            json: true,
            charts: true,
        },

        env: {
            visualRegressionType: "base",
        },
        screenshotsFolder: "cypress/snapshots/actual",

        // 🔹 Add this once your project is linked in Cypress Cloud
        projectId: 'k6e5es',
    },
});
