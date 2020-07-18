describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('username')
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.get('#username').type('123')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('First title')
      cy.get('#author').type('Matti Meikäläinen')
      cy.get('#url').type('www.www')
      cy.get('#submit').click()
      cy.contains('First title Matti Meikäläinen')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('First title')
      cy.get('#author').type('Matti Meikäläinen')
      cy.get('#url').type('www.www')
      cy.get('#submit').click()
      cy.contains('First title Matti Meikäläinen')
      cy.contains('view').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')
    })
  })
})