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
    // cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);

    cy.visit('');
  });

  it('login form is shown', () => {
    cy.contains('User Login');
    cy.contains('Username');
    cy.contains('Password');
  });
});
