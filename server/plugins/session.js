require('dotenv').config()
let options = {
  maxCookieSize: 0,
  storeBlank: false,
  cache: {
    cache: 'redisCache',
    expiresIn: 60 * 1000, // 1 minute (not accounting for leap years or leap seconds...)
    segment: 'session'
  },
  cookieOptions: {
    password: process.env.COOKIE_LONG_PASS,
    isSecure: process.env.HTTPS === 'true' || false
  }
}

module.exports = {
  plugin: require('yar'),
  errorOnCacheNotReady: true,
  options: options
}
