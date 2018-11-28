const config = require('../config')
const sessionCookieName = config.sessionCookieName

// This module is based on the session-cache module of the fish-sales-app (https://github.com/DEFRA/fish-sales-app/blob/develop/server/services/session-cache.js).
// It has been modified to use Yar/Catbox/Redis instead of DynamoDB.
const self = module.exports = {
  create: async (request, h) => {
    const cache = {}

    try {
      request.yar.set(sessionCookieName, cache)
      request.log('info', `Created new session ${request.yar.id}`)
      return cache
    } catch (err) {
      request.log('error', 'Failed to create new session')
      throw err
    }
  },
  update: async (request, h) => {
    const cache = request.yar.get(sessionCookieName)

    if (!cache) {
      request.log('error', 'No session found to update')
      throw new Error('No session found to update')
    }

    request.log('info', `Updating session ${request.yar.id}`)

    try {
      const updatedCache = updateSessionCache(cache, request.payload)
      request.yar.set(sessionCookieName, updatedCache)
      request.log('info', `Updated session ${request.yar.id}`)
      return cache
    } catch (err) {
      request.log('error', err)
      throw err
    }
  },
  get: async (request, h) => {
    let cache
    try {
      cache = request.yar.get(sessionCookieName)
      if (cache) {
        request.log('info', `Got session ${request.yar.id}`)
      } else {
        cache = await createSessionIfRequired(request, 'No session cookie', h)
        request.log('info', `Got session ${request.yar.id}`)
      }
    } catch (err) {
      request.log('error', err)
      throw err
    }
    return cache
  },
  getSessionItem: async (request, item) => {
    try {
      if (request.yar.get(sessionCookieName)) {
        let cache = request.yar.get(sessionCookieName)
        return cache[item]
      } else {
        return null
      }
    } catch (err) {
      throw new Error(`Session item ${item} does not exist`)
    }
  },
  destroy: async (request, h) => {
    // Prepare to reset the session cookie.
    request.yar.reset()
    return true
  }
}

function updateSessionCache (session, values) {
  if ('password' in values) {
    delete values.password
  }
  return Object.assign(session, values)
}

async function createSessionIfRequired (request, errorMessage, h) {
  let session
  if (request.createSessionIfAbsent) {
    request.log('Cache item not found - creating new session')
    session = await self.create(request, h)
  } else {
    throw new Error(errorMessage)
  }
  return session
}
