/* eslint-env mocha */
/* global cy */

/**
 * Basic Integration test. 
 * Will load the main app page.
 * Sign In header needs to be present.
 */
describe('Landing Page', () => {
    it('loads and -Sign In- text is shown', () => {
        cy.visit('https://employees-70f8e.firebaseapp.com/');
        cy.contains('Sign In');
    });
});
