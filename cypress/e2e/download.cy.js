// cypress/e2e/download.cy.js
describe("Download Techsila Logo", () => {
    it("downloads Techsila logo", () => {
        cy.visit("https://techsila.io");

        cy.get("img[alt='logo']")
            .invoke("attr", "src")
            .then((logoUrl) => {
                const finalUrl = logoUrl.startsWith("http")
                    ? logoUrl
                    : `https://techsila.io${logoUrl}`;

                // ✅ Use plugin
                cy.downloadFile(finalUrl, "cypress/downloads", "techsila-logo.webp");
            });

        cy.readFile("cypress/downloads/techsila-logo.webp", "binary", {
            timeout: 15000,
        }).should((file) => {
            expect(file.length).to.be.greaterThan(100);
        });
    });
});
