describe("Visual Regression Example", () => {
    it("Homepage snapshot", () => {
        cy.visit("https://tazofoods.com");
        cy.compareSnapshot("homepage", { errorThreshold: 0.1 });
        // 0.1 = allow 10% pixel diff tolerance
    });
});

