var api = require('../../services/notification-api')

module.exports = [{
  // (GET) Start of notification user journey
  method: 'GET',
  path: '/notification/final',
  options: {
    handler: (request, h) => {
      var note = api.getNotification('GB 0001 006415')
      console.log(JSON.stringify(note))
      return h.view('notification/final', { notification: note.id })
    }
  }
}
]
