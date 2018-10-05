const joi = require('joi')
const ViewModel = require('../../models/notification/shipment-type.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/shipment-type', new ViewModel(null))
  },

  post: async (request, h) => {
    return h.redirect('notification-id')
  },

  fail: (request, h, error) => {
    return h.view('notification/shipment-type', new ViewModel(error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification/shipment-type',
  options: {
    description: 'Handle the page request for shipment type',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notification/shipment-type',
  options: {
    description: 'Handle the post to the shipment type page',
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
