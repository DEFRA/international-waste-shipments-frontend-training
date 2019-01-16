const config = require('./config')
const sessionCookieName = config.sessionCookieName
const hoek = require('hoek')

// State is cached using linkage between yar and catbox-redis.

async function getState (request) {
  return Promise.resolve(request.yar.get(sessionCookieName) || {})
}

async function mergeState (request, value) {
  const state = request.yar.get(sessionCookieName) || {}
  hoek.merge(state, value, true, false)
  request.yar.set(sessionCookieName, state)
  return Promise.resolve(state)
}

module.exports = { getState, mergeState }
