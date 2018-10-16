const joi = require('joi')
const ViewModel = require('../models/notification-id-model.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification-id', new ViewModel(null))
  },

  post: async (request, h) => {
    let notificationId = request.payload.notificationId
    request.yar.set('notificationId', notificationId)
    return h.redirect('./')
  },

  fail: (request, h, error) => {
    return h.view('notification-id', new ViewModel(error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification-id',
  options: {
    description: 'Handle the page request for notificationId',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notification-id',
  options: {
    description: 'Handle the post to the notificationId page',
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
