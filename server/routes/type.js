const joi = require('joi')
const ViewModel = require('../models/type-model.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('type', new ViewModel(null))
  },

  post: async (request, h) => {
    // let type = request.payload.type
    // Add notification to Redis
    console.log(request.payload)
    return h.redirect('./notification-id')
  },

  fail: (request, h, error) => {
    return h.view('type', new ViewModel(error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/type',
  options: {
    description: 'Handle the page request for authority',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/type',
  options: {
    description: 'Handle the post to the authority page',
    handler: handlers.post,
    validate: {
      payload: {
        type: joi.string().required().max(10)
      },
      failAction: handlers.fail
    }
  }
}
]
