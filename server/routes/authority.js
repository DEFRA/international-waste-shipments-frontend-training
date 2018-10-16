const joi = require('joi')
const ViewModel = require('../models/authority-model.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    const apiUrl = require('../routes/home')
    console.log(apiUrl)
    return h.view('authority', new ViewModel(null))
  },

  post: async (request, h) => {
    // Add authority to Redis
    let authority = request.payload.authority
    request.yar.set('authority', authority)
    return h.redirect('./type')
  },

  fail: (request, h, error) => {
    let authority = request.payload.authority
    return h.view('authority', new ViewModel(error, authority)).takeover()
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
        authority: joi.string().required().max(4)
      },
      failAction: handlers.fail
    }
  }
}
]
