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

  lab.test('4 - Test error displayed on correct property for organisation name', async () => {
    let errors = ['organisationName']
    let register = new ViewModel(countries, errors)
    Code.expect(register.model.organisationName.errorMessage.text).to.not.equal(null)
  })
})
