describe('Note app', function () {
  const serverUrl = 'http://localhost:3001/api';
  const clientUrl = 'http://localhost:5173';
  const user = {
    name: 'Amandeep Singh',
    username: 'amandeep',
    password: 'Aman@1234',
  };

  beforeEach(function () {
    // Clear DB
    cy.request('POST', `${serverUrl}/testing/reset`);

    // Add new user
    cy.request('POST', `${serverUrl}/users`, user);

    cy.visit(clientUrl);
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
    cy.get('#username').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login-button').click();

    cy.contains(`${user.name} logged in`);
  });

  it.only('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type(user.username);
    cy.get('#password').type('wrong password');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong Credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', `${user.name} logged in`);
    cy.contains(`${user.name} logged in`).should('not.exist');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login-button').click();
    });

    it('a new note can be created', function () {
      const note = 'a note created by cypress';

      cy.contains('new note').click();
      cy.get('#note-input').type(note);
      cy.contains('save').click();
      cy.contains(note);
    });

    describe('and a note exists', function () {
      const note = 'another note cypress';

      beforeEach(function () {
        cy.contains('new note').click();
        cy.get('input').type(note);
        cy.contains('save').click();
      });

      it('it can be made not important', function () {
        cy.contains(note).contains('make note important').click();

        cy.contains(note).contains('make important');
      });
    });
  });
});
