const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const ViewModel = require('../../models/applicant/home.js')

const handlers = {
  get: async (request, h) => {
    return h.view('applicant/home', new ViewModel(null))
  }
}

module.exports =
hoek.merge({
  method: 'GET',
  path: '/applicant/home',
  options: {
    description: 'Handle the page request for home page',
    handler: handlers.get
  }
}, baseRouteHandler.get)
