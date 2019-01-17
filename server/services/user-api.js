const bcrypt = require('bcrypt')
const _ = require('lodash')
const restClient = require('../services/rest-client')
const config = require('../config')
const saltRounds = 10
// A module providing access to a user API. A monolithic layered application based solution
// might utilise coding to programming language interfaces here. Instead a RESTful API is utilised
// as part of a microservice based solution. RESTful APIs function at the level of well known protocols
// such as HTTP rather than the programming language level.

module.exports = {
  get: async function (request) {
    // Temporary local authentication for development purposes. Replace with service call.
    let user = await restClient.getJson(`${config.userService}/user/${request.payload.email}`)

    let isValidPassword = false
    if (user.length > 0) {
      isValidPassword = await bcrypt.compare(request.payload.password, user[0].passwordhash)
    }
    if (isValidPassword) {
      return user
    } else {
      throw new Error('Authentication error')
    }
  },
  post: async function (user) {
    let salt = bcrypt.genSaltSync(saltRounds)
    user.password = bcrypt.hashSync(user.password, salt)
    try {
      await restClient.postJson(`${config.userService}/user`, { payload: user })
    } catch (err) {
      if (err.isBoom) {
        if (_.get(err, 'output.statusCode') !== 400) {
          throw err
        }
        return false
      } else {
        throw err
      }
    }
    return true
  }
}
