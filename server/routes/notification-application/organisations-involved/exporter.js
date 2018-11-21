// const PartialView = require('../../models/partials/sidebar.js')
const ViewModel = require('../../../models/notification-application/organisations-involved/exporter.js')

const handlers = {
  get: async (request, h) => {
    return h.view('notification-application/organisations-involved/exporter', new ViewModel(null))
  }
}

module.exports = {
  method: 'GET',
  path: '/notification-application/organisations-involved/exporter',
  options: {
    description: 'Handle the page request for the /exporter page',
    handler: handlers.get
  }
}
