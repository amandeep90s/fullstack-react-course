describe('Note app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science University of Helsinki 2024'
    );
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  it('user can login', function () {
    cy.contains('login').click();
    cy.get('#username').type('amandeep');
    cy.get('#password').type('Aman@1234');
    cy.get('#login-button').click();

    cy.contains('Amandeep Singh logged in');
  });
});
