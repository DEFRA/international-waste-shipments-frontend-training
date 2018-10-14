const config = require('../config')
exports.plugin = {
  name: 'auth',
  register: (server, options) => {
    /**
     * Register cookie
     */
    server.state(config.sessionCookieName, {
      ttl: config.sessionTimeoutMinutes * 60 * 1000,
      isSecure: config.env !== 'development',
      isHttpOnly: true,
      path: '/',
      encoding: 'base64json'
    })
  }
}
