const hapi = require('hapi')
const config = require('./config')

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
      host: config.redisHost,
      password: config.redisPassword,
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
        expiresIn: config.sessionTimeoutMinutes * 60 * 1000, // (not accounting for leap years or leap seconds...)
        segment: 'session'
      },
      cookieOptions: {
        password: config.cookiePassword,
        isSecure: config.env !== 'development' || false
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
