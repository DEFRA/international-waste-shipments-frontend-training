const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const schema = require('../../schema/notification/notification-type')
const sessionCache = require('../../services/session-cache')
const ViewModel = require('../../models/notification/notification-type.js')

// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    let notificationType = await sessionCache.getSessionItem(request, 'notificationtype')
    return h.view('notification/notification-type', new ViewModel(notificationType, null))
  },

  post: async (request, h) => {
    // Prepare for saving the notification to persistent storage.
    request.persistNotification = true
    return h.redirect('./notification-id')
  },

  fail: (request, h, error) => {
    const notificationType = (request.payload.notificationtype)
    return h.view('notification/notification-type', new ViewModel(notificationType, error)).takeover()
  }
}

module.exports = [
  hoek.merge({
    method: 'GET',
    path: '/notification/notification-type',
    options: {
      description: 'Handle the page request for notification type',
      handler: handlers.get
    }
  }, baseRouteHandler.get),
  // Merge common session management into the POST handler.
  hoek.merge({
    method: 'POST',
    path: '/notification/notification-type',
    options: {
      description: 'Handle the post to the notification type page',
      handler: handlers.post,
      validate: {
        payload: { notificationtype: schema },
        failAction: handlers.fail
      }
    }
  }, baseRouteHandler.post)]
