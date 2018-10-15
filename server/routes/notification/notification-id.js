const joi = require('joi')
const ViewModel = require('../../models/notification/notification-id.js')
const sessionCache = require('../../services/session-cache.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/notification-id', new ViewModel(null))
  },

  post: async (request, h) => {
    // The  transaction is complete so destroy the session cookie
    sessionCache.destroy(request, h)
    return h.redirect('/')
  },

  fail: (request, h, error) => {
    return h.view('notification/notification-id', new ViewModel(error)).takeover()
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
    handler: handlers.post,
    validate: {
      payload: {
        notificationId: joi.string()
      },
      failAction: handlers.fail
    }
  }
}
]