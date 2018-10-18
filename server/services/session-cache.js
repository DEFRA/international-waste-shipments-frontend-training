const config = require('../config')
const sessionCookieName = config.sessionCookieName
const uuid = require('uuid')

// This module is based on the session-cache module of the fish-sales-app (https://github.com/DEFRA/fish-sales-app/blob/develop/server/services/session-cache.js).
// It has been modified to use Yar/Catbox/Redis rather than the notification API and DynamoDB.
const self = module.exports = {
  create: async (request, h) => {
    const cache = {}
    const id = uuid.v4()
    request.log('info', 'Creating new session ' + id)

    try {
      cache.notificationId = id
      request.yar.set(sessionCookieName, cache)
      request.log('info', 'Created new session ' + cache.id)
      return cache
    } catch (err) {
      request.log('error', 'Failed to create new session ' + cache.id)
      throw err
    }
  },
  update: async (request, h) => {
    const cache = request.yar.get(sessionCookieName)

    if (!cache) {
      request.log('error', 'No session found to update')
      throw new Error('No session found to update')
    }

    request.log('info', 'Updating session ' + cache.id)

    try {
      const updatedCache = updateSessionCache(cache, request.payload)
      request.yar.set(sessionCookieName, updatedCache)
      request.log('info', 'Updated session ' + request.yar.id)
      return cache
    } catch (err) {
      request.log('error', err)
      throw err
    }
  },
  get: async (request, h) => {
    try {
      let cache = request.yar.get(sessionCookieName)

      if (cache) {
        request.log('info', 'Got session ' + request.yar.id)
      } else {
        if (request.createSessionIfAbsent) {
          request.log('Cache item not found - creating new session')
          cache = await self.create(request, h)
        } else {
          cache = await createSessionIfRequired(request, 'No session cookie', h)
        }
        request.log('info', `Got session ${cache.id}`)
        return cache
      }
    } catch (err) {
      request.log('error', err)
      throw err
    }
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
      throw new Error('Session item ' + item + ' does not exist')
    }
  },
  destroy: async (request, h) => {
    // Prepare to reset the session cookie.
    request.yar.reset()
    return true
  }
}

function updateSessionCache (session, values) {
  var newSession = Object.assign(session, values)
  return newSession
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
