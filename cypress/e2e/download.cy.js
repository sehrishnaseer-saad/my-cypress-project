describe("Download Techsila Logo", () => {
    it("should download the Base64 logo", () => {
        cy.visit("https://techsila.io");

        cy.get("img[alt='logo']")
            .invoke("attr", "src")
            .then((src) => {
                if (src.startsWith("data:image")) {
                    const base64String = src.split(",")[1];
                    cy.task("saveBase64File", {
                        fileName: "cypress/downloads/techsila-logo.webp",
                        base64String,
                    });
                } else {
                    throw new Error("❌ Logo is not Base64 encoded");
                }
            });
    });
});



