/* eslint-env mocha */
/* global cy */

describe('Landing Page', () => {
    it('loads and -Sign In- text is shown', () => {
        cy.visit('https://employees-70f8e.firebaseapp.com/dashboard');
        cy.contains('Sign In');
    });
});