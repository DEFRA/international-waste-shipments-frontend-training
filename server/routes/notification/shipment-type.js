const schema = require('../../schema/notification/shipment-type')
const ViewModel = require('../../models/notification/shipment-type.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    let notification = request.yar.get('notification')
    if (notification == null) {
      notification = {}
    }
    return h.view('notification/shipment-type', new ViewModel(notification.type, false))
  },

  post: async (request, h) => {
    let notification = request.yar.get('notification')
    if (notification == null) {
      notification = {}
    }
    notification.type = request.payload.type
    request.yar.set('notification', notification)

    return h.redirect('notification-id')
  },

  fail: (request, h, error) => {
    const type = (request.payload.type)
    return h.view('notification/shipment-type', new ViewModel(type, error)).takeover()
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
    validate: { payload: { type: schema },
      failAction: handlers.fail
    }
  }
}
]
