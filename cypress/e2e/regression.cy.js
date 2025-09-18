describe('File Upload', () => {
    it('uploads a file and verifies UI', () => {
        cy.visit('https://the-internet.herokuapp.com/upload');
        cy.uploadFile('testFile.png', 'input[type="file"]');
        cy.get('#file-submit').click();
        cy.get('#uploaded-files').should('contain.text', 'testFile.png');
    });
});
// this is the comments
// this is the 2nd comment