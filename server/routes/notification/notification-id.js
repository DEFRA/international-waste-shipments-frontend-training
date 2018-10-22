const ViewModel = require('../../models/notification/notification-id.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/notification-id', new ViewModel(null))
  },

  post: async (request, h) => {
    const notification = request.yar.get('notification')
    return h.response(notification).code(200)
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification/notification-id',
  options: {
    description: 'Handle the page request for notification id number',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notification/notification-id',
  options: {
    description: 'Handle the post to the notification id number page',
    handler: handlers.post
  }
}
]
