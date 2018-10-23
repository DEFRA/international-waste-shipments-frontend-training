const joi = require('joi')

// Define config schema
const schema = {
  port: joi.number().default(3000),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  notificationService: joi.string().uri().required(),
  restClientTimeoutMillis: joi.number().default(5000),
  sessionCookieName: joi.string().default('iwsSessionCookie'),
  sessionTimeoutMinutes: joi.number().default(15),
  sessionCacheName: joi.string().default('redis-cache'),
  sessionCacheHost: joi.string().default('localhost'),
  sessionCachePort: joi.number().default(6379),
  sessionCachePassword: joi.string().required()
}

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  notificationService: process.env.IWS_NOTIFICATION_SERVICE,
  restClientTimeoutMillis: process.env.IWS_REQUEST_TIMEOUT_IN_MILLIS,
  sessionCookieName: process.env.IWS_SESSION_COOKIE_NAME,
  sessionTimeoutMinutes: process.env.IWS_SESSION_TIMEOUT_IN_MINUTES,
  sessionCacheName: process.env.IWS_SESSION_CACHE_NAME,
  sessionCacheHost: process.env.IWS_SESSION_CACHE_HOST,
  sessionCachePort: process.env.IWS_SESSION_CACHE_PORT,
  sessionCachePassword: process.env.IWS_SESSION_CACHE_PASSWORD
}

// Validate config
const result = joi.validate(config, schema, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the joi validated value
const value = result.value

// Add some helper props
value.isDev = value.env === 'development'
value.isProd = value.env === 'production'

module.exports = value
