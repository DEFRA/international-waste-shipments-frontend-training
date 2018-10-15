const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const schema = require('../../schema/notification/shipment-type')
const ViewModel = require('../../models/notification/shipment-type.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/shipment-type', new ViewModel(null))
  },

  post: async (request, h) => {
    return h.redirect('./notification-id')
  },

  fail: (request, h, error) => {
    const shipmentType = (request.payload.type)
    return h.view('notification/shipment-type', new ViewModel(shipmentType, error)).takeover()
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
// Merge common session management into the POST handler.
hoek.merge({
  method: 'POST',
  path: '/notification/shipment-type',
  options: {
    description: 'Handle the post to the shipment type page',
    handler: handlers.post,
    validate: { payload: { type: schema },
      failAction: handlers.fail
    }
  }
}, baseRouteHandler.post)]
