const ViewModel = require('../../models/applicant/register.js')
const countryService = require('../../services/country-api')

const handlers = {
  get: async (request, h) => {
    let countries = await countryService.get()
    return h.view('applicant/register', new ViewModel(countries, null))
  }
}

module.exports = {
  method: 'GET',
  path: '/applicant/register',
  options: {
    description: 'Handle the page request for registering',
    handler: handlers.get
  }
}
