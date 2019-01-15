const bcrypt = require('bcrypt')
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
    let user = { email: 'dev@iws.gov.uk', userid: 'c88b353c-0090-48fe-8f0d-90a1f8eebff9', passwordHash: '$2b$10$b/gB1ALSbgfbKUpBdQOzOuQ.5Xy6fkSQ8q3Ko1ieGoaPN3KMI.bea' } // secret
    let requestEmail = request.payload.email
    let requestPassword = request.payload.password
    const isValidPassword = await bcrypt.compare(requestPassword, user.passwordHash)
    if (requestEmail === user.email && isValidPassword) {
      return user
    } else {
      throw new Error('Authentication error')
    }
  },
  post: async function (user) {
    var salt = bcrypt.genSaltSync(saltRounds)
    var passwordHash = bcrypt.hashSync(request.payload.password, salt)
    await restClient.postJson(`${config.userService}/user`, { payload: user })
  }
}
