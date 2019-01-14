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
    // TODO hash password
    userService.post(request.payload)
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
