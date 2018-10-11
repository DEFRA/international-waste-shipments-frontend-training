exports.plugin = {
  name: 'auth',
  register: (server, options) => {
    /**
     * Register cookie
     */
    server.state(process.env.IWS_NOTIFICATION_SESSION_COOKIE_NAME, {
      ttl: process.env.IWS_SESSION_TIMEOUT_IN_MINUTES * 60 * 1000,
      isSecure: process.env.NODE_ENV !== 'development',
      isHttpOnly: true,
      path: '/',
      encoding: 'base64json'
    })
  }
}
