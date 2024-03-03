describe('Note app', function () {
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

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains(
      'Note app, Department of Computer Science University of Helsinki 2024'
    );
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it('a new note can be created', function () {
      const note = 'a note created by cypress';

      cy.contains('New note').click();
      cy.get('#note-input').type(note);
      cy.contains('save').click();
      cy.contains(note);
    });

    describe('and a note exists', function () {
      const note = { content: 'another note cypress', important: true };

      beforeEach(function () {
        cy.createNote(note);
      });

      it('it can be made not important', function () {
        cy.contains(note.content).parent().find('button').click();

        cy.contains(note.content)
          .parent()
          .find('button')
          .contains('make important');
      });
    });

    describe('and several notes exist', () => {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false });
        cy.createNote({ content: 'second note', important: false });
        cy.createNote({ content: 'three note', important: false });
      });

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click();
        cy.contains('second note')
          .parent()
          .find('button')
          .should('contain', 'make note important');
      });

      it('one of those can be made important 2', function () {
        cy.contains('second note').parent().find('button').as('theButton');
        cy.get('@theButton').click();
        cy.get('@theButton').should('contain', 'make note important');
      });
    });
  });

  it('login fails with wrong password', function () {
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
});
