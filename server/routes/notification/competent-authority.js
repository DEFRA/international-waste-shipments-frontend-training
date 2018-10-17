const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
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
// Merge common session management into the POST handler.
hoek.merge({
  method: 'POST',
  path: '/notification/competent-authority',
  options: {
    description: 'Handle the post to the competent authority page',
    // The route specific pre-handler will be prepended to existing pre-handlers.
    pre: [{ method: ensureSessionCacheEntryExists }],
    handler: handlers.post,
    validate: { payload: { authority: schema },
      failAction: handlers.fail
    }
  }
}, baseRouteHandler.post)]

async function ensureSessionCacheEntryExists (request, h) {
  request.log('Ensuring session exists')
  // Set a property on the request to enable lazy session creation.
  request.createSessionIfAbsent = true
  return h.continue
}
