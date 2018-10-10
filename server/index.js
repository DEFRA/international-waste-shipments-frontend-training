const hapi = require('hapi')
const config = require('./config')
require('dotenv').config()

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    },
    cache: [{
      name: 'redisCache',
      engine: require('catbox-redis'),
      host: process.env.REDIS_HOSTNAME,
      password: process.env.REDIS_PASSWORD,
      partition: 'iws'
    }]
  })

  // Register the plugins
  await server.register(require('inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register({
    plugin: require('yar'),
    options: {
      maxCookieSize: 0,
      storeBlank: false,
      cache: {
        cache: 'redisCache',
        expiresIn: 60 * 1000, // 1 minute (not accounting for leap years or leap seconds...)
        segment: 'session'
      },
      cookieOptions: {
        password: process.env.COOKIE_PASSWORD,
        isSecure: process.env.HTTPS === 'true' || false
      }
    }
  })

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }

  return server
}

module.exports = createServer
