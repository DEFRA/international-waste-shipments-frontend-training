const config = require('../config')
const request = require('../services/request')

function get (id) {
  console.log('calling API GET method to retrieve notification id ' + id)
  return request.request(config.notificationApi.url, 'notification', config.notificationApi.token, 'GET', id)
}

function put (id) {
  console.log('calling API PUT to add/update notification id ' + id)
  return request.request(config.notificationApi.url, 'notification', config.notificationApi.token, 'PUT', id)
}

module.exports.get = get
module.exports.put = put
