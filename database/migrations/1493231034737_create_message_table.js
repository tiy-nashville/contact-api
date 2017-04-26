'use strict'

const Schema = use('Schema')

class MessagesTableSchema extends Schema {

  up () {
    this.create('messages', (table) => {
      table.increments()
      table.timestamps()

      table.string('name')
      table.string('email')
      table.text('message')
      table.boolean('contacted')
    })
  }

  down () {
    this.drop('messages')
  }

}

module.exports = MessagesTableSchema
