'use strict'

const Command = use('Command')

class Greet extends Command {

  /**
   * signature defines the requirements and name
   * of command.
   *
   * @return {String}
   */
  get signature () {
    return 'make:user'
  }

  /**
   * description is the little helpful information displayed
   * on the console.
   *
   * @return {String}
   */
  get description () {
    return 'Make a new user'
  }

  /**
   * handle method is invoked automatically by ace, once your
   * command has been executed.
   *
   * @param  {Object} args    [description]
   * @param  {Object} options [description]
   */
  * handle (args, options) {
    const email = yield this.ask('User email:').print()
    const password = yield this.secure('User password:').print()

    console.log({email, password})


    const User = use('App/Model/User')
    const Hash = use('Hash')

    const u = yield User.create({email, password: password })

    this.success(`Done creating user ${email} with id: ${u.id}`)

    process.exit()
  }

}

module.exports = Greet
