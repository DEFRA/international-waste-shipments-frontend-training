const config = require('../config')
const restClient = require('../services/rest-client')

module.exports = {
  get: async function (id) {
    return restClient.getJson(`${config.notificationService}/notification/${id}`)
  },
  put: async function (notification) {
    return restClient.putJson(`${config.notificationService}/notification/${notification.id}`, { payload: notification })
  }
}
