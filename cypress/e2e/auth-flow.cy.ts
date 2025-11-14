describe('Auth shell basic flow', () => {
  beforeEach(() => {
    // intercept translations and return fixture
    cy.stubI18n('en');
    cy.visit('/login'); // baseUrl configurado en cypress.config.ts
  });

  it('shows login by default and can toggle to register', () => {
    // check login visible
    cy.get('[data-cy="auth-card"]').should('exist');
    cy.get('[data-cy="titleLogin"]').should('be.visible'); 
    cy.get('[data-cy="titleSignin"]').should('not.be.visible');
    // click toggle (the button that flips to register)
    cy.get('[data-cy="toggle-view-to-signin"]').click().then( () =>{
        // ensure URL updated to /register (if you use replaceState in AuthShell)
        cy.url().should('include', '/register');
        //cy.get('[data-cy="titleLogin"]').should('not.be.visible'); 
        //cy.get('[data-cy="titleSignin"]').should('be.visible');
    });



    // check the flip class on wrapper (if you add it)
    cy.get('[data-cy="auth-card-inner"]').should('have.class', 'flipped');
  });

  it('sets rememberMe when checkbox is checked', () => {
    // mark remember me in login form
    cy.get('[data-cy="remember-me"]').find('[type="checkbox"]').check();
    // submit with mocked network/auth
    cy.get('[data-cy="register-form"]').submit();

    // assert cookie
    cy.getCookie('app_settings')
      .should('exist')
      .then((c) => {
        if (!c) throw new Error('Cookie app_settings no encontrada');
        const parsed = JSON.parse(decodeURIComponent(c.value));
        expect(parsed.rememberMe).to.be.true;
      });
  });
});
