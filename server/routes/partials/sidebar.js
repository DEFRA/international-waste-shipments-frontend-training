const ViewModel = require('../../content/sidebar.js')

const handlers = {
  get: async (request, h) => {
    return h.view('partials/sidebar', new ViewModel(null))
  }
}

module.exports = {
  method: 'GET',
  path: '/partials/sidebar',
  options: {
    description: 'Handle the page request for the sidebar',
    handler: handlers.get
  }
}
