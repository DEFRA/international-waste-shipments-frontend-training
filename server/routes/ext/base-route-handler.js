const Boom = require('boom')
const hoek = require('hoek')
const sessionCache = require('../../services/session-cache')

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
    return h.redirect('/').takeover()
  }
}

async function updateSessionCache (request, h) {
  try {
    if (request.sessionCache) {
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
