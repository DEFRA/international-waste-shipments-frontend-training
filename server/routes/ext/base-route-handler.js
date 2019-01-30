const Boom = require('boom')
const notificationService = require('../../services/notification-api')
const sessionCache = require('../../services/session-cache')

// A route template for HTTP requests that facilitates session management without the use of cut and paste.
module.exports = {
  get: {
    options: {
      pre: [{ method: getSessionCache }]
    }
  },
  post: {
    options: {
      pre: [{ method: getSessionCache }],
      ext: {
        onPostHandler: { method: updateSessionCache }
      }
    }
  }
}

async function getSessionCache (request, h) {
  try {
    let result = await sessionCache.get(request, h)
    if (!result) {
      throw new Error('Cache item not found')
    }
    return h.continue
  } catch (err) {
    // If a session could not be retrieved, redirect to the home page to start a new user journey.
    return h.redirect('/').takeover()
  }
}

async function updateSessionCache (request, h) {
  try {
    // Merge the request payload with the session data and save the result.
    await sessionCache.update(request, h)
    if (request.persistNotification) {
      let response = await notificationService.post(await sessionCache.get(request, h))
      request.payload.notificationnumber = response.notificationnumber
      await sessionCache.update(request, h)
    }
    return h.continue
  } catch (err) {
    return Boom.badRequest('Failed to update session cache', err)
  }
}
