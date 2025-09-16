describe('GDUSA Navigation from Hamburger Menu', () => {
   before(() => {
     // Prevent Cypress from failing on JS errors from the site
     Cypress.on('uncaught:exception', () => false);
   });
 
   it('should hover over Competitions and click a submenu item', () => {
     // Visit the homepage
     cy.visit('https://gdusa.com');
 
     // Click the "Subscribe" button (if that's required)
     cy.get('.elementor-element-ba3cf3a > .elementor-widget-container > .elementor-button-wrapper > .elementor-button')
     .should('be.visible')
       .click();
 
     // Click the hamburger menu to open it
     cy.get('.elementor-element-2bdeade > .elementor-widget-container > .elementor-menu-toggle')
     .should('be.visible')
       .click();
 
     // Wait for the menu to open
     cy.wait(2000); // or replace with .should() if possible
 
   // Wait for submenu to appear
     cy.wait(5000);
 
     // Click on the submenu item by ID
     cy.get('#sm-17459321822139026-11')
  .should('exist')
  .should('be.visible') // Optional: confirm visibility before clicking
  .click({ force: true });
     // Optionally, confirm navigation happened
     cy.url().should('include', 'competitions'); // adjust if needed
   });
});
