const Boom = require('boom')
const hoek = require('hoek')
const sessionCache = require('../../services/session-cache')

// A route template for POST requests that facilitates session management without the use of cut and paste.
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
    request.sessionId = result.id
    return h.continue
  } catch (err) {
    // If a session could not be retrieved, redirect to the home page to start a new user journey.
    return h.redirect('/').takeover()
  }
}

async function updateSessionCache (request, h) {
  try {
    // Retrieved session data should have added to the request.
    if (request.sessionCache) {
      // Merge the request payload with the session data and save the result.
      hoek.merge(request.sessionCache, request.payload)
      await sessionCache.update(request, h)
      return h.continue
    } else {
      throw new Error('Missing session')
    }
  } catch (err) {
    return Boom.badRequest('Failed to update session cache', err)
  }
}
