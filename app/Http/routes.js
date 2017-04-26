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

Route.get('/login', function* (request, response) {
  yield response.sendView('login')
})

Route.post('/login', function* (request, response) {
  const {
    email,
    password
  } = request.only('email', 'password')

  const login = yield request.auth.attempt(email, password)

  if (login) {
    return response.redirect('/crm/messages')
  }

  response.unauthorized('Invalid credentails')
})

Route.group('crm', function () {
  Route.get('/crm/messages', function* (request, response) {
    const messages = yield Message.all()

    yield response.sendView('message.index', {
      messages: messages.toJSON()
    })
  })

  Route.get('/crm/messages/:id', function* (request, response) {
    const message = yield Message.find(request.param('id'))

    yield response.sendView('message.show', {
      message: message.toJSON()
    })
  })

  Route.post('/crm/messages/:id/contacted', function* (request, response) {
    const message = yield Message.find(request.param('id'))
    message.contacted = JSON.parse(request.input('contacted'))

    yield message.save()

    yield response.redirect('back')
  })
}).middleware('auth')

Route.post('/messages', function* (request, response) {
  const params = request.only('email', 'name', 'message')

  const m = yield Message.create(params)

  response.send(m)
})
