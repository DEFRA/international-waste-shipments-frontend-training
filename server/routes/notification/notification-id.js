const joi = require('joi')
const ViewModel = require('../../models/notification/notification-id.js')
const sessionCache = require('../../services/session-cache.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    // Do not attempt to persist a notification without a valid session
    try {
      let notification = await sessionCache.get(request, h)
      // The  user journey is complete so destroy the session cookie
      await sessionCache.destroy(request, h)
      return h.view('notification/notification-id', new ViewModel(notification.notificationNumber, null))
    } catch (err) {
      return h.redirect('/').takeover()
    }
  },

  post: async (request, h) => {
    return h.redirect('/').takeover()
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
// As the user journey is complete, common session management is not required by this POST handler.
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
