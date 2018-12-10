const _ = require('lodash')
const config = require('../config')
const restClient = require('../services/rest-client')

module.exports = {
  get: async function () {
    let countries
    try {
      countries = await restClient.getJson(`${config.countryService}/countries`)
    } catch (err) {
      if (err.isBoom) {
        if (_.get(err, 'output.statusCode') !== 404) {
          throw err
        }
      } else {
        throw err
      }
    }
    return countries
  }
}
