const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const ViewModel = require('../../models/applicant/login.js')
const userService = require('../../services/user-api')

const handlers = {
  get: async (request, h) => {
    return h.view('applicant/login', new ViewModel(null))
  },
  post: async (request, h) => {
    try {
      await userService.get(request)
      return h.redirect('/applicant/home').takeover()
    } catch (err) {
      return h.view('applicant/login', new ViewModel(null, err)).takeover()
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/applicant/login',
  options: {
    description: 'Handle the page request for login page',
    handler: handlers.get
  }
},
hoek.merge({
  method: 'POST',
  path: '/applicant/login',
  options: {
    description: 'Handle the post to the login page',
    pre: [{ method: ensureSessionCacheEntryExists }],
    handler: handlers.post
  }
}, baseRouteHandler.post)]

async function ensureSessionCacheEntryExists (request, h) {
  request.log('Ensuring session exists')
  // Set a property on the request to enable lazy session creation.
  request.createSessionIfAbsent = true
  return h.continue
}
