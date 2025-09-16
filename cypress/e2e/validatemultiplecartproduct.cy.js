describe('Validate cart subtotal on TazoFoods', () => {
    const parseMoney = (text) => {
        return parseInt(text.replace(/[^0-9]/g, ''), 10);
    };
    it('should validate subtotal equals sum of (price × quantity) for all products', () => {
        const products = [
            { slug: '/products/mozzarella-block-1-kg', qty: 1 },
            { slug: '/products/cheddar-cheese-block-1-kg', qty: 1 },
            { slug: '/products/shredded-pizza-cheese-1-kg', qty: 1 }
        ];

        let calcSubtotal = 0;

        cy.wrap(null).then(() => {
            return products.reduce((chain, product) => {
                return chain.then(() => {
                    cy.log(`➡️ Visiting: ${product.slug}`);
                    return cy.visit(`https://www.tazofoods.com${product.slug}`)
                        .get('#Quantity-product-template', { timeout: 10000 })
                        .clear()
                        .type(product.qty.toString())
                        .should('have.value', product.qty.toString())
                        // grab unit price from PDP
                        .get('.product__price', { timeout: 10000 })
                        .invoke('text')
                        .then((priceText) => {
                            // Extract the first number from the string
                            const match = priceText.match(/\d[\d,]*/);
                            const unitPrice = match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;

                            const lineTotal = unitPrice * product.qty;
                            calcSubtotal += lineTotal;

                            cy.log(`🧀 Product: ${product.slug}`);
                            cy.log(`   Raw Price Text: ${priceText}`);
                            cy.log(`   Parsed Unit Price: ${unitPrice}`);
                            cy.log(`   Quantity: ${product.qty}`);
                            cy.log(`   Line Total: ${lineTotal}`);
                            cy.log(`   Running Subtotal: ${calcSubtotal}`);
                        })
                        // add to cart
                        .get('.btn.product-form__cart-submit.btn--secondary-accent', { timeout: 15000 })
                        .click()
                        .then(() => {
                            cy.get('body').then(($body) => {
                                const continueSel = '.cart-popup__cta-link.btn.btn--secondary-accent';
                                if ($body.find(continueSel).length) {
                                    cy.get(continueSel)
                                        .should('be.visible')
                                        .click();
                                }
                            });
                        });
                });
            }, Cypress.Promise.resolve());
        })
            .then(() => {
                // Go to cart page and validate subtotal
                cy.visit('https://www.tazofoods.com/cart');

                cy.get('.cart-subtotal__price', { timeout: 10000 })
                    .invoke('text')
                    .then((subtotalText) => {
                        // Extract first number (like 4,540)
                        const match = subtotalText.match(/\d[\d,]*/);
                        const displayedSubtotal = match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;

                        cy.log(`🛒 Raw Subtotal Text: ${subtotalText}`);
                        cy.log(`🛒 Parsed Subtotal: ${displayedSubtotal}`);

                        const roundedCalc = Math.round(calcSubtotal);
                        const roundedDisplayed = Math.round(displayedSubtotal);

                        cy.log(`🧮 Final Calculated Subtotal: ${roundedCalc}`);
                        cy.log(`🛒 Displayed Subtotal: ${roundedDisplayed}`);

                        expect(roundedCalc, 'Subtotal should match sum of line totals')
                            .to.equal(roundedDisplayed);
                    });
            });
    });
});