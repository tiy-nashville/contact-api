# Contact API

This is a small CRM for small porfolios allowing you to have a contact form without the fuss.

## Deploying

* `hub clone tiy-nashville/contact-api`
* `cd contact-api`
* `heroku create` - Makes a new app on heroku
* `git push heroku master` - Pushes app to heroku
* `heroku config:set $(./ace key:generate --echo)` - Creates an app secret key
* `heroku addons:create heroku-postgresql:hobby-dev` - Adds a PG database
* `heroku run yarn migrate` - Runs migrations

## Creating a user

* `heroku run yarn user`

## Seeing the app

* `heroku open` Gets you to the home page
* Add `/login` to the url to get to the login page

## Making requests

* Find your API url (ex. `https://glacial-garden-95413.herokuapp.com`)
* Make a fetch request like below

```js
const inputValues = {
  email: emailInput.value,
  name: nameInput.value,
  message: messageInput.value,
}

fetch('https://glacial-garden-95413.herokuapp.com', {
  method: 'POST',
  headers: { accept: 'application/json', 'content-type': 'application/json' },
  body: JSON.stringify(inputValues)
}).then(r => r.json())
  .then((data) => {
    // Do what you want after the API has saved your message
  })
```
