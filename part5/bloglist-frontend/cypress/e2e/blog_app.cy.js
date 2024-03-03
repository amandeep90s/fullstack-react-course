describe('Blog app', () => {
  const blog = {
    title: 'My blog app',
    author: 'Amandeep',
    url: 'http://google.com',
    likes: 0,
  };

  const user = {
    name: 'Amandeep Singh',
    username: 'amandeep',
    password: 'Aman@1234',
  };

  beforeEach(function () {
    // Clear DB
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    // Add new user
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

    cy.visit('');
  });

  it('Login form is shown', () => {
    cy.contains('User Login');
    cy.contains('Username');
    cy.contains('Password');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: user.username, password: user.password });

      cy.contains(`${user.name} logged in`);
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type(user.username);
      cy.get('#password').type('wrong password');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', `${user.name} logged in`);
      cy.contains(`${user.name} logged in`).should('not.exist');
    });
  });
});
