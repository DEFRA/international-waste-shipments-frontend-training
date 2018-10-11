const wreck = require('wreck').defaults({
  timeout: process.env.IWS_REQUEST_TIMEOUT_IN_MILLIS || 5000
})

const self = module.exports = {
  request: async (method, url, options) => {
    return wreck[method](url, options)
      .then(response => {
        const res = response.res
        const payload = response.payload

        if (res.statusCode !== 200) {
          const err = (payload || new Error('Unknown error'))
          throw err
        }

        return payload
      })
  },

  get: async (url, options) => {
    return self.request('get', url, options)
  },

  post: async (url, options) => {
    return self.request('post', url, options)
  },

  postJson: async (url, options) => {
    options = options || {}
    options.json = true

    return self.post(url, options)
  },

  getJson: async (url) => {
    return self.get(url, { json: true })
  }
}
