/// <reference types="cypress" />

describe('OrangeHRM File Upload Test', () => {

    beforeEach(() => {
        // Visit login page
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        // Login
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        // Ensure dashboard is visible
        cy.url().should('include', '/dashboard');
    });

    it('Uploads a profile picture and validates upload', () => {
        // Navigate to My Info
        cy.contains('My Info').click();
        cy.url().should('include', '/pim/viewPersonalDetails');

        // Capture old profile picture src
        cy.get('img.employee-image')
            .invoke('attr', 'src')
            .then((oldSrc) => {

                // Start intercepting upload API
                cy.intercept('**/pim/viewPhoto/**').as('uploadPhoto');

                // Click on avatar to activate hidden file input
                cy.get('img.employee-image').click({ force: true });

                // Upload new file from fixtures
                cy.get('input[type="file"]', { timeout: 10000 })
                    .should('exist')
                    .selectFile('cypress/fixtures/profile-pic.png', { force: true });

                // Click Save button
                cy.contains('Save').click({ force: true });

                // ✅ Validation 1: API call should return 200
                cy.wait('@uploadPhoto', { timeout: 10000 })
                    .its('response.statusCode')
                    .should('be.oneOf', [200, 304]);


                // ✅ Validation 2: Success message should appear
                cy.contains('Successfully Updated', { timeout: 10000 }).should('be.visible');

                // ✅ Validation 3: Profile picture src should change
                cy.get('img.employee-image')
                    .should('have.attr', 'src')
                    .and('not.eq', oldSrc);
            });
    });

});
