export {};

declare global {
  namespace Cypress {
    interface Chainable {
      stubI18n(lang?: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add('stubI18n', (lang: string = 'en') => {
  cy.intercept('GET', `/assets/i18n/${lang}.json`, { fixture: `${lang}.json` }).as('i18n');
});
