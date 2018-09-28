const joi = require('joi')
const ViewModel = require('../models/notificationId-model.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notificationId', new ViewModel(null))
  },

  post: async (request, h) => {
    // let authority = request.payload.authority
    // Add authority to Redis
    return h.redirect('./')
  },

  fail: (request, h, error) => {
    return h.view('notificationId', new ViewModel(error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/notificationId',
  options: {
    description: 'Handle the page request for notificationId',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notificationId',
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
