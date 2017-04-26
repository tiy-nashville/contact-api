'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

const Message = use('App/Model/Message')
const User = use('App/Model/User')
const Hash = use('Hash')

Route.get('/login', function *(request, response) {
  yield response.sendView('login')
})

Route.post('/login', function *(request, response) {
  const { email, password } = request.only('email', 'password')

  const login = yield request.auth.attempt(email, password)

    if (login) {
      return response.redirect('/crm/messages')
    }

    response.unauthorized('Invalid credentails')
})

Route.post('/messages', function *(request, response) {
  const params = request.only('email', 'name', 'message')

  const m = yield Message.create(params)

  response.send(m)
})
