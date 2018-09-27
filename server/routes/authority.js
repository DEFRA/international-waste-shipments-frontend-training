const joi = require('joi')
const ViewModel = require('../models/authority-view.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('authority', new ViewModel(null))
  },

  post: async (request, h) => {
    // let authority = request.payload.authority
    // Add authority to Redis
    return h.redirect('./type')
  },

  fail: (request, h, error) => {
    return h.view('authority', new ViewModel(error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/authority',
  options: {
    description: 'Handle the page request for authority',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/authority',
  options: {
    description: 'Handle the post to the authority page',
    handler: handlers.post,
    validate: {
      payload: {
        authority: joi.string().required().max(10)
      },
      failAction: handlers.fail
    }
  }
}
]
