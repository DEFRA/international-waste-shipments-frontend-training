const hoek = require('hoek')
const sessionCache = require('../db')
const notificationService = require('../services/notification-api')
// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
var notificationCount = 1

const handlers = {
  post: async (request, h) => {
    // Generate the notification number and add it to the payload
    let notificationNumberPayload = {
      notificationnumber: generateNotificationNumber()
    }
    hoek.merge(request.payload, notificationNumberPayload)
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

// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
function generateNotificationNumber () {
  let paddedNotificationNumber = `${notificationCount++}`.padStart(10, '0')
  return `GB ${paddedNotificationNumber}`
}
