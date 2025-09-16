describe('login', () => {
    it('verify student can login', () => {
      const randomEmail = `user_${Math.random().toString(36).substring(2, 10)}@mailinator.com`;
      cy.wait(10000);
      //enter web page
      cy.visit('https://int.ilmzone.com');
      cy.get('#signin').click();
      //enter email address
      cy.wait(3000);
      cy.get('input[name="email"]').type(randomEmail);
     //enter password
      cy.get('input[name="password"]').type('password123');
      //click on login button
      cy.get('button[type="submit"].width_login').click();
       cy.screenshot('login-error-message');
  })
  })
  
  
  
  
  
  
  
  
  