const joi = require('joi')
const ViewModel = require('../../models/notification/notification-id-model.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/notification-id', new ViewModel(null))
  },

  post: async (request, h) => {
    // let authority = request.payload.authority
    // Add authority to Redis
    return h.redirect('/applicant/home')
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
