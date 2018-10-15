const hapi = require('hapi')
const config = require('./config')
require('dotenv').config()

async function createServer () {
  // Create the hapi server
  const server = hapi.server({
    port: config.port,
    cache: [
      {
        name: 'redisCache',
        engine: require('catbox-redis'),
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_HOSTPORT,
        partition: process.env.REDIS_PARTITION
      }
    ],
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  })

  // Register the plugins
  await server.register(require('./plugins/session'))
  await server.register(require('inert'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register(require('./plugins/health'))

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }
  server.state('data')
  return server
}

module.exports = createServer
