'use strict'
const hapi = require('hapi')

const path = require('path')
const dataFilePath = path.join(__dirname, 'govsite.example.json')
const data = require(dataFilePath)
const Model = require('digital-form-builder-engine/model')
const { getState, mergeState } = require('./db')
const relativeTo = __dirname

console.log(data)

const model = new Model(data, {
  getState,
  mergeState,
  relativeTo
})

async function createServer () {
  // Create the hapi server
  const config = require('./config')
  const server = hapi.server({
    port: config.port,
    routes: {
      validate: {
        options: {
          abortEarly: false
        }
      },
      cache: {
        otherwise: 'no-cache, must-revalidate, max-age=0, no-store'
      }
    },
    cache: [
      {
        engine: require('catbox-redis'),
        name: config.sessionCacheName,
        host: config.sessionCacheHost,
        port: config.sessionCachePort
      }
    ]
  })

  // Register the plugins
  await server.register(require('inert'))
  // await server.register(require('./plugins/auth'))
  await server.register(require('./plugins/views'))
  await server.register(require('./plugins/router'))
  await server.register(require('./plugins/error-pages'))
  await server.register(require('./plugins/session-cache'))

  await server.register({
    plugin: require('digital-form-builder-designer'),
    options: {
      path: dataFilePath
    }
  })
  await server.register({
    plugin: require('digital-form-builder-engine'),
    options: {
      model: model,
      ordnanceSurveyKey: config.ordnanceSurveyKey
    }
  })

  if (config.isDev) {
    await server.register(require('blipp'))
    await server.register(require('./plugins/logging'))
  }

  return server
}

module.exports = createServer
