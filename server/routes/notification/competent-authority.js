const schema = require('../../schema/notification/competent-authority')
const ViewModel = require('../../models/notification/competent-authority.js')
// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    return h.view('notification/competent-authority', new ViewModel(null))
  },

  post: async (request, h) => {
    return h.redirect('./shipment-type')
  },

  fail: (request, h, error) => {
    const competentAuthority = (request.payload.authority)
    return h.view('notification/competent-authority', new ViewModel(competentAuthority, error)).takeover()
  }
}

module.exports = [{
  method: 'GET',
  path: '/notification/competent-authority',
  options: {
    description: 'Handle the page request for competent authority',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/notification/competent-authority',
  options: {
    description: 'Handle the post to the competent authority page',
    handler: handlers.post,
    validate: { payload: { authority: schema },
      failAction: handlers.fail
    }
  }
}
]
