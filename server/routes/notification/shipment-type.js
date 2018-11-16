const baseRouteHandler = require('../ext/base-route-handler')
const hoek = require('hoek')
const schema = require('../../schema/notification/shipment-type')
const sessionCache = require('../../services/session-cache')
const ViewModel = require('../../models/notification/shipment-type.js')
// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
var notificationCount = 1

// GET, POST & FAIL handlers seperated from the route export
const handlers = {
  get: async (request, h) => {
    let shipmentType = await sessionCache.getSessionItem(request, 'type')
    return h.view('notification/shipment-type', new ViewModel(shipmentType, null))
  },

  post: async (request, h) => {
    // Generate the notification number and add it to the payload
    let notificationNumberPayload = {
      notificationNumber: generateNotificationNumber()
    }
    hoek.merge(request.payload, notificationNumberPayload)
    // Prepare for saving the notification to persistent storage.
    request.persistNotification = true
    return h.redirect('./notification-id')
  },

  fail: (request, h, error) => {
    const shipmentType = (request.payload.type)
    return h.view('notification/shipment-type', new ViewModel(shipmentType, error)).takeover()
  }
}

module.exports = [
  hoek.merge({
    method: 'GET',
    path: '/notification/shipment-type',
    options: {
      description: 'Handle the page request for shipment type',
      handler: handlers.get
    }
  }, baseRouteHandler.get),
  // Merge common session management into the POST handler.
  hoek.merge({
    method: 'POST',
    path: '/notification/shipment-type',
    options: {
      description: 'Handle the post to the shipment type page',
      handler: handlers.post,
      validate: {
        payload: { type: schema },
        failAction: handlers.fail
      }
    }
  }, baseRouteHandler.post)]

// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
function generateNotificationNumber () {
  let paddedNotificationNumber = `${notificationCount++}`.padStart(10, '0')
  return `GB ${paddedNotificationNumber}`
}
