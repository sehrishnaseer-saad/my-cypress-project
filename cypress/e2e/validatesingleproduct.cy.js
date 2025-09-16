describe('Validate cart total on Tazo', () => {

    // Function to calculate total
    function calculateTotal(price, quantity) {
        return price * quantity;
    }

    it('should validate total = price × quantity', () => {
        cy.visit('https://www.tazofoods.com');
        cy.get('a[href*="mozzarella-block"]', { timeout: 15000 }).click();

        const quantity = 4;         // Quantity of items
        const expectedTotal = 6240; // Expected total

        // Set quantity on product page
        cy.get('#Quantity-product-template', { timeout: 10000 })
            .clear()
            .type(quantity.toString())
            .should('have.value', quantity.toString());

        cy.get('.btn.product-form__cart-submit.btn--secondary-accent', { timeout: 15000 })
            .click();

        cy.get('body').then(($body) => {
            const viewCartSel = '.cart-popup__cta-link.btn.btn--secondary-accent';
            if ($body.find(viewCartSel).length) {
                cy.get(viewCartSel, { timeout: 15000 }).click();
            } else {
                cy.visit('/cart');
            }
        });

        // Extract price and validate inside .then()
        cy.get('#shopify-section-cart-template > div > div:nth-child(1) > form > table > tbody > tr > td.cart__price.text-right > div:nth-child(1) > dl > div:nth-child(2) > dd')
            .invoke('text')
            .then((text) => {
                // Remove everything except digits
                const numericString = text.replace(/[^0-9]/g, ''); // "156000"
                const priceValue = parseFloat(numericString) / 100; // 1560.00
                cy.log('Price is: ' + priceValue);

                // Calculate total using function
                const actualTotal = calculateTotal(priceValue, quantity);

                // Validate result
                expect(actualTotal, 'Total should match').to.equal(expectedTotal);

                // Add condition for extra logging
                if (actualTotal === expectedTotal) {
                    cy.log('✅ Total is correct: ' + actualTotal);
                } else {
                    cy.log('❌ Total is incorrect! Expected ' + expectedTotal + ' but got ' + actualTotal);
                }
            });
    });
});
