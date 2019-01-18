const ViewModel = require('../../models/applicant/register.js')
const countryService = require('../../services/country-api')
const schema = require('../../schema/applicant/register')
const userService = require('../../services/user-api')

const handlers = {
  get: async (request, h) => {
    let countries = await countryService.get()
    return h.view('applicant/register', new ViewModel(countries, null))
  },
  post: async (request, h) => {
    let response = await userService.post(request.payload)
    if (response === false) {
      let detail = {}
      detail.message = '"duplicateAccount" Error'
      let error = {}
      error.details = []
      error.details.push(detail)

      return handlers.fail(request, h, error)
    }
    return h.redirect('./home')
  },
  fail: async (request, h, error) => {
    let countries = await countryService.get()
    let errors = []
    error.details.forEach(item => {
      let property = item.message.substring(item.message.indexOf('"') + 1, item.message.indexOf('" '))
      errors.push(property)
    })
    return h.view('applicant/register', new ViewModel(countries, errors, request.payload)).takeover()
  }
}
module.exports = [{
  method: 'GET',
  path: '/applicant/register',
  options: {
    description: 'Handle the page request for registering',
    handler: handlers.get
  }
},
{
  method: 'POST',
  path: '/applicant/register',
  options: {
    description: 'Handle the post for registration',
    handler: handlers.post,
    validate: {
      payload: schema,
      failAction: handlers.fail
    }
  }
}]
