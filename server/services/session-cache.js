const notificationService = require('../services/notification-api')
const uuid = require('uuid')
const SESSION_COOKIE_NAME = process.env.IWS_NOTIFICATION_SESSION_COOKIE_NAME

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
    request.sessionCache = cache
    return cache
  },
  destroy: async (request, h) => {
    request.log('info', 'Destroying session')
    h.state(SESSION_COOKIE_NAME, null)
    h.unstate(SESSION_COOKIE_NAME)

    const session = getSessionCookie(request)

    if (!session) {
      const err = new Error('No session found')
      request.log('error', err)
      throw err
    }

    request.log('info', 'Destroyed session ' + session.id)

    return true
  }
}

function getSessionCookie (request) {
  return request.state[SESSION_COOKIE_NAME]
    ? request.state[SESSION_COOKIE_NAME].sessionId
    : null
}

function setSessionCookie (h, sessionId) {
  h.unstate(SESSION_COOKIE_NAME)
  const session = { sessionId: sessionId }
  // Put the session object in for the reply later on
  h.state(SESSION_COOKIE_NAME, session)
}
