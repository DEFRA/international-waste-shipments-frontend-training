const config = require('../config')
const notificationService = require('../services/notification-api')
const uuid = require('uuid')

// This module is based on the session-cache module of the fish-sales-app (https://github.com/DEFRA/fish-sales-app/blob/develop/server/services/session-cache.js).
// The main changes are support for lazy session cache creation and delegation to the Notification API
// (https://github.com/DEFRA/international-waste-shipments-notification-service-training) instead of DynamoDb.
// This module may be replaced as things progress.
const self = module.exports = {
  create: async (request, h) => {
    const cache = {}
    const id = uuid.v4()

    cache.id = id
    cache.timestamp = new Date()

    request.log('info', 'Creating new session ' + id)

    try {
      setSessionCookie(h, cache.id)
      request.log('info', 'Created new session ' + cache.id)
      return cache
    } catch (err) {
      request.log('error', 'Failed to create new session ' + cache.id)
      throw err
    }
  },
  update: async (request, h) => {
    const cache = request.sessionCache

    if (!cache || !cache.id) {
      request.log('error', 'No session found to update')
      throw new Error('No session found to update')
    }

    request.log('info', 'Updating session ' + cache.id)

    try {
      await notificationService.put(cache)
      request.log('info', 'Updated session ' + cache.id)
      return cache
    } catch (err) {
      request.log('error', err)
      throw err
    }
  },
  get: async (request, h) => {
    let cache
    let sessionId = getSessionCookie(request)

    if (sessionId) {
      try {
        // Use the Notification API as the source of the cache for initial training purposes.
        cache = await notificationService.get(sessionId)
        if (!cache) {
          const err = new Error('Session not found ' + sessionId)
          request.log('error', err)
          throw err
        }
        request.log('info', 'Got session ' + sessionId)
      } catch (err) {
        request.log('error', err)
        throw err
      }
    } else {
      if (request.createSessionIfAbsent) {
        request.log('Cache item not found - creating new session')
        cache = await self.create(request, h)
      } else {
        request.log('error', 'No session cookie')
        throw new Error('No session cookie')
      }
    }
    return cache
  },
  destroy: async (request, h) => {
    // Prepare to remove the session cookie. Removal of the cache entry can be managed elsewhere
    // once notification data has reached persistent storage.
    const sessionId = getSessionCookie(request)
    if (sessionId) {
      request.log('info', `Destroying session cookie for session ${sessionId}`)
      h.state(config.sessionCookieName, null)
      h.unstate(config.sessionCookieName)
    } else {
      const err = new Error('No session found')
      request.log('error', err)
      throw err
    }

    return true
  }
}

function getSessionCookie (request) {
  return request.state[config.sessionCookieName]
    ? request.state[config.sessionCookieName].sessionId
    : null
}

function setSessionCookie (h, sessionId) {
  h.unstate(config.sessionCookieName)
  const session = { sessionId: sessionId }
  // Put the session object in for the reply later on
  h.state(config.sessionCookieName, session)
}
