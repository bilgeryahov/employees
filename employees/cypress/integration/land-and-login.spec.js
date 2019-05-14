/* eslint-disable no-undef */

import { TEST_USER } from '../shared/configs';

/**
 * Integration test, which goes through the following steps:
 *   * load the web app;
 *   * check if the current page allows --Sign In--;
 *   * check if the necessary elements are present to fulfil the operation;
 *   * enter a user name and a password, following that click appropriate button;
 *   * verify that the --Dashboard-- page is loaded;
 */
describe('Land and login:', () => {
    beforeEach(() => cy.visit('/'));
    it('loads and -Sign In- text is shown', () => cy.contains('Sign In'));
    it('checks if the -email-  and -password- input fields are present, as well as the -sign in- button', () =>
        cy.get('[class=form-group]')
            .children()
            .should('have.length', 3));
    it('logs a User in', () => {
        cy.get('[type=text]').type(TEST_USER.EMAIL || Cypress.env('TEST_EMAIL'));
        cy.get('[type=password]').type(TEST_USER.PASSWORD || Cypress.env('TEST_PASSWORD'));
        cy.get('button').click();
        // Wait about 5 seconds to make sure the login happens.
        cy.wait(5000);
        cy.location('pathname').should('eq', '/dashboard');
    });
    it('loads and -Dashboard- text is shown', () => cy.contains('Dashboard.'));
});
