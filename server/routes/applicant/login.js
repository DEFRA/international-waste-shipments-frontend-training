const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const joi = require('joi')
const ViewModel = require('../../models/applicant/login.js')
const userService = require('../../services/user-api')

const handlers = {
  get: async (request, h) => {
    return h.view('applicant/login', new ViewModel(null))
  },
  post: async (request, h) => {
    try {
      let user = await userService.get(request)
      let userPayload = {
        userid: user[0].id,
        createddate: Date.now()
      }
      hoek.merge(request.payload, userPayload)
      return h.redirect('/applicant/home')
    } catch (err) {
      return h.view('applicant/login', new ViewModel(null, err)).takeover()
    }
  },
  fail: (request, h, error) => {
    return h.view('applicant/login', new ViewModel(null, error)).takeover()
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
    handler: handlers.post,
    validate: {
      payload: {
        email: joi.string().email({ minDomainAtoms: 2 }),
        password: joi.string()
      },
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
