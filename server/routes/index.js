const config = require('../config')

const handlers = {
  get: async (request, h) => {
    if (request.yar.get(config.sessionCookieName)) {
      return h.redirect('/applicant/home').takeover()
    } else {
      return h.redirect('/applicant/login').takeover()
    }
  }
}

module.exports = {
  method: 'GET',
  path: '/',
  options: {
    description: 'Handle the page request for home page',
    handler: handlers.get
  }
}
