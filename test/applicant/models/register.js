const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const ViewModel = require('../../../server/models/applicant/register.js')

lab.experiment('Home Tests', () => {
  let countries = []

  lab.beforeEach(async () => {
    countries = [{
      id: 1,
      name: 'United Kingdom'
    },
    {
      id: 2,
      name: 'Norfolk Island'
    },
    {
      id: 3,
      name: 'Singapore'
    }
    ]
  })

  lab.test('1 - Test countries list populated', async () => {
    let register = new ViewModel(countries, null)
    Code.expect(register.model.country.items.length).to.equal(3)
  })

  lab.test('2 - Test UK is default country', async () => {
    let register = new ViewModel(countries, null)
    Code.expect(register.model.country.items.find(x => x.selected).text).to.equal('United Kingdom')
  })

  lab.test('3 - Test error displayed on correct property for first name', async () => {
    let errors = ['firstName']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.firstName.errorMessage.text).to.not.equal(null)
  })

  lab.test('4 - Test error displayed on correct property for last name', async () => {
    let errors = ['lastName']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.lastName.errorMessage.text).to.not.equal(null)
  })

  lab.test('5 - Test error displayed on correct property for organisation name', async () => {
    let errors = ['organisationName']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.organisationName.errorMessage.text).to.not.equal(null)
  })

  lab.test('6 - Test error displayed on correct property for telephone number', async () => {
    let errors = ['telephoneNumber']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.telephoneNumber.errorMessage.text).to.not.equal(null)
  })

  lab.test('7 - Test error displayed on correct property for email', async () => {
    let errors = ['email']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.email.errorMessage.text).to.not.equal(null)
  })

  lab.test('8 - Test error displayed on correct property for address line 1', async () => {
    let errors = ['addressLine1']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.addressLine1.errorMessage.text).to.not.equal(null)
  })

  lab.test('9 - Test error displayed on correct property for address line 2', async () => {
    let errors = ['addressLine2']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.addressLine2.errorMessage.text).to.not.equal(null)
  })

  lab.test('10 - Test error displayed on correct property for town or city', async () => {
    let errors = ['town']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.town.errorMessage.text).to.not.equal(null)
  })

  lab.test('11 - Test error displayed on correct property for county', async () => {
    let errors = ['county']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.county.errorMessage.text).to.not.equal(null)
  })

  lab.test('12 - Test error displayed on correct property for postcode', async () => {
    let errors = ['postcode']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.postcode.errorMessage.text).to.not.equal(null)
  })

  lab.test('13 - Test error displayed on correct property for country', async () => {
    let errors = ['country']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.country.errorMessage.text).to.not.equal(null)
  })

  lab.test('14 - Test error displayed on correct property for password', async () => {
    let errors = ['password']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.password.errorMessage.text).to.not.equal(null)
  })

  lab.test('15 - Test error displayed on correct property for confirm password', async () => {
    let errors = ['confirmPassword']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.confirmPassword.errorMessage.text).to.not.equal(null)
  })

  lab.test('16 - Test error displayed on correct property for terms and conditions', async () => {
    let errors = ['termsandconditions']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.termsandconditions.errorMessage.text).to.not.equal(null)
  })
})
