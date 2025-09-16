describe('signup', () => {
    it('verify student can signup', () => {
      //enter web page
      cy.visit('https://int.ilmzone.com');
      cy.wait(5000);
      //click on join button
      cy.get('#signup').click();
      //click on student
      cy.get('label[for="Student"]').click();
      //click on continue with google
      cy.get('button.signup-btn').click();
      cy.get('label[for="Student"]').click;
      //enter email
      cy.get('#email').type('sweetawan22@mailinator.com').should('be.visible').click();
      //enter password
      cy.get('#password').type('R@fayzara123');
      //enter firstname
      cy.get('#first_name').type('John');
       //enter last name
       cy.get('#last_name').type('doe');
       //click join
       cy.get('button.btn-primary.width_login').should('have,join').click();
    })
})


