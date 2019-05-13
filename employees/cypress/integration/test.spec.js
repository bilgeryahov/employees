describe('Landing Page', () => {
    beforeEach(() => cy.visit('http://localhost:8080/'));
    it('loads and -Sign In- text is shown', () => {    
        cy.contains('Sign In');
    });
});
