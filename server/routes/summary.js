const sessionCache = require('../db')
const notificationService = require('../services/notification-api')
const handlers = {
  post: async (request, h) => {
    await notificationService.post(await sessionCache.getState(request))
    return h.redirect('/notification-submitted')
  }
}
module.exports = {
  method: 'POST',
  path: '/summary',
  options: {
    description: 'Handle a POST request from the summary page',
    handler: handlers.post
  }
}
