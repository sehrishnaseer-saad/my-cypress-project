const { defineConfig } = require("cypress");
const { configureVisualRegression } = require("cypress-visual-regression");
const fs = require("fs");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // 🔹 Visual Regression plugin
            configureVisualRegression(on);

            // 🔹 File saving task (Node context)
            on("task", {
                saveBase64File({ fileName, base64String }) {
                    fs.writeFileSync(fileName, Buffer.from(base64String, "base64"));
                    return null;
                },
            });

            return config;
        },
        env: {
            visualRegressionType: "base",
        },
        screenshotsFolder: "cypress/snapshots/actual",
    },
});
