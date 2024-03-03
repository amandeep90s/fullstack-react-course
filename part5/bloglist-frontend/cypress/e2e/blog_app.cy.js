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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
      cy.createBlog(blog);
    });

    it('A blog can be created', function () {
      cy.get('.blog-content')
        .should('contain', blog.title)
        .should('contain', blog.author);
    });

    it('A blog can be updated', function () {
      cy.get('.showHideButton').click();
      cy.get('.updateButton').click();
      cy.get('.blog-content').should('contain', 'Likes: 1');
    });

    it('Only valid user can delete the blog', function () {
      const newUser = {
        name: 'Mandeep Singh',
        username: 'mandeep',
        password: 'Mand@1234',
      };

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser);
      cy.login({ username: newUser.username, password: newUser.password });
      cy.get('.showHideButton').click();
      cy.get('.deleteButton').should('not.exist');
      cy.get('#logoutButton').click();
      cy.login({ username: user.username, password: user.password });
      cy.get('.showHideButton').click();
      cy.get('.deleteButton').click();
      cy.get('.blog-content').should('not.exist');
    });

    it('Only valid user can see delete button', function () {
      const newUser = {
        name: 'Mandeep Singh',
        username: 'mandeep',
        password: 'Mand@1234',
      };

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, newUser);
      cy.login({ username: newUser.username, password: newUser.password });
      cy.get('.showHideButton').click();
      cy.get('.deleteButton').should('not.exist');
      cy.get('#logoutButton').click();
      cy.login({ username: user.username, password: user.password });
      cy.get('.showHideButton').click();
      cy.get('.deleteButton').should('be.visible');
    });

    it('orders blogs by likes, with the most liked blog being first', () => {
      // Create three blogs
      cy.createBlog({ ...blog, title: 'First Blog', likes: 500 });

      // Click .showHideButton button on the first blog to display the like button
      cy.get('.blog-content').eq(0).find('.showHideButton').click();

      // Click like button on the first blog multiple times
      cy.get('.blog-content')
        .eq(0)
        .find('.updateButton')
        .click()
        .click()
        .click();

      cy.get('.blog-content').eq(1).find('.showHideButton').click();
      cy.get('.blog-content')
        .eq(1)
        .find('.likes-count')
        .then(($likesCount) => {
          const likesOfSecondBlog = parseInt($likesCount.text());

          cy.get('.blog-content')
            .eq(0)
            .find('.likes-count')
            .then(($likesCountFirst) => {
              const likesOfFirstBlog = parseInt($likesCountFirst.text());
              expect(likesOfSecondBlog).to.be.lessThan(likesOfFirstBlog);
            });
        });
    });
  });
});
