const config = require('../config')
module.exports = {
  plugin: require('yar'),
  options: {
    storeBlank: true,
    maxCookieSize: 0,
    cache: {
      cache: config.sessionCacheName,
      expiresIn: config.sessionTimeoutMinutes * 60 * 1000
    },
    cookieOptions: {
      password: config.sessionCachePassword,
      isSecure: config.env !== 'development'
    }
  }
}
