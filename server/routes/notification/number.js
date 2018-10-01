const api = require('../../services/notification-api')

module.exports = {
  method: 'GET',
  path: '/notification/number/{id}',
  options: {
    handler: (request, h) => {
      let notification = api.get(request.params.id)
      return h.view('notification/number', {
        id: notification.id
      })
    }
  }
}
