const config = require('../config')
const restClient = require('../services/rest-client')

// A module providing access to a notification API. A monolithic layered application based solution
// might utilise coding to programming language interfaces here. Instead a RESTful API is utilised
// as part of a microservice based solution. RESTful APIs function at the level of well known protocols
// such as HTTP rather than the programming language level.
// While the initial implementation is nothing more than a wrapper for REST calls it could evolve to
// include logic such as payload manipulation.
module.exports = {
  get: async function (id) {
    return restClient.getJson(`${config.notificationService}/notification/${id}`)
  },
  put: async function (notification) {
    return restClient.putJson(`${config.notificationService}/notification/${notification.id}`, { payload: notification })
  }
}
