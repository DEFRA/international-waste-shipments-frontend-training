function get (id) {
  if (id == null) {
    console.log('calling API GET method to generate new id')
  } else {
    console.log(`calling API GET method to retrieve notification id ${id}`)
  }

  // As no API yet exists just return new notifiction.
  // return request.request(config.notificationApi.url, 'notification', config.notificationApi.token, 'GET', id)
  return {
    id: id || 'GB 0001 000001'
  }
}

function put (notification) {
  console.log(`calling API PUT to add/update notification id ${notification.id}`)
  // As no API yet exists just return 200 status code
  // return request.request(config.notificationApi.url, 'notification', config.notificationApi.token, 'PUT', notification)

  return {
    statusCode: 200
  }
}

module.exports.get = get
module.exports.put = put
