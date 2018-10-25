const Boom = require('boom')
const config = require('../../config')
const sessionCache = require('../../services/session-cache')
const sessionCookieName = config.sessionCookieName

// A route template for HTTP requests that facilitates session management without the use of cut and paste.
module.exports = {
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
    // Defensive programming as retrieved session data should have added to the request by the function above.
    if (request.yar.get(sessionCookieName)) {
      // Merge the request payload with the session data and save the result.
      await sessionCache.update(request, h)
      return h.continue
    } else {
      throw new Error('Missing session')
    }
  } catch (err) {
    return Boom.badRequest('Failed to update session cache', err)
  }
}
