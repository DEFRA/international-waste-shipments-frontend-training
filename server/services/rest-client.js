const config = require('../config')
const wreck = require('wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

// A set of convenience functions intended for use with RESTful APIs.
// This module is based on the utils module of the fish-sales-app (https://github.com/DEFRA/fish-sales-app/blob/develop/server/util.js)
// Functionality like this is normally published as a or as part of a utility module for use by multiple projects.
const self = module.exports = {
  request: async (method, url, options) => {
    try {
      const response = await wreck[method](url, options)
      return response.payload
    } catch (err) {
      throw err
    }
  },

  get: async (url, options) => {
    return self.request('get', url, options)
  },

  getJson: async (url) => {
    return self.get(url, { json: true })
  },

  post: async (url, options) => {
    return self.request('post', url, options)
  },

  postJson: async (url, options) => {
    options = options || {}
    options.json = true

    return self.post(url, options)
  },

  put: async (url, options) => {
    return self.request('put', url, options)
  },

  putJson: async (url, options) => {
    options = options || {}
    options.json = true

    return self.put(url, options)
  }
}
