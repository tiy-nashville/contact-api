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
