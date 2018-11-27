const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const schema = require('../../schema/notification/competent-authority')
const sessionCache = require('../../services/session-cache')
const ViewModel = require('../../models/notification/competent-authority.js')
// GET, POST & FAIL handlers separated from the route export
const handlers = {
  get: async (request, h) => {
    let competentAuthority = await sessionCache.getSessionItem(request, 'authority')
    return h.view('notification/competent-authority', new ViewModel(competentAuthority, null))
  },
  post: async (request, h) => {
    return h.redirect('./notification-type')
  },
  fail: (request, h, error) => {
    const competentAuthority = (request.payload.authority)
    return h.view('notification/competent-authority', new ViewModel(competentAuthority, error)).takeover()
  }
}

module.exports = [
  hoek.merge({
    method: 'GET',
    path: '/notification/competent-authority',
    options: {
      description: 'Handle the page request for competent authority',
      handler: handlers.get
    }
  }, baseRouteHandler.get),
  // Merge common session management into the POST handler.
  hoek.merge({
    method: 'POST',
    path: '/notification/competent-authority',
    options: {
      description: 'Handle the post to the competent authority page',
      handler: handlers.post,
      validate: {
        payload: { competentauthority: schema },
        failAction: handlers.fail
      }
    }
  }, baseRouteHandler.post)]
