const _ = require('lodash')
const config = require('../config')
const restClient = require('../services/rest-client')

// A module providing access to a notification API. A monolithic layered application based solution
// might utilise coding to programming language interfaces here. Instead a RESTful API is utilised
// as part of a microservice based solution. RESTful APIs function at the level of well known protocols
// such as HTTP rather than the programming language level.
module.exports = {
  get: async function (id) {
    // If the Notification API returns a 404 status code, the REST client will thrown an exception.
    // Convert this to an undefined return to differentiate this scenario from other exceptions.
    let notification
    try {
      notification = await restClient.getJson(`${config.notificationService}/notification/${id}`)
    } catch (err) {
      if (err.isBoom) {
        if (_.get(err, 'output.statusCode') !== 404) {
          throw err
        }
      } else {
        throw err
      }
    }
    return notification
  },
  post: async function (notification) {
    return restClient.postJson(`${config.notificationService}/notification`, { payload: notification })
  }
}
