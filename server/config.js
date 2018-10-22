const joi = require('joi')

// Define config schema
const schema = {
  port: joi.number().default(3000),
  env: joi.string().valid('development', 'test', 'production').default('development'),
  notificationService: joi.string().uri().required(),
  redisHost: joi.string().required(),
  redisPassword: joi.string().required(),
  cookiePassword: joi.string().required(),
  sessionTimeoutMinutes: joi.number().default(30),
  restClientTimeoutMillis: joi.number().default(5000)
}

// Build config
const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  notificationService: process.env.IWS_NOTIFICATION_SERVICE,
  redisHost: process.env.REDIS_HOSTNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  cookiePassword: process.env.COOKIE_PASSWORD,
  sessionTimeoutMinutes: process.env.IWS_SESSION_TIMEOUT_IN_MINUTES,
  restClientTimeoutMillis: process.env.IWS_REQUEST_TIMEOUT_IN_MILLIS
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

module.exports = Object.freeze(value)
