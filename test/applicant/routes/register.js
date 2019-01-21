const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../../../server')
const sinon = require('sinon')
const countryService = require('../../../server/services/country-api')

lab.experiment('Registration Tests', () => {
  let server
  let sandbox
  let countries = []

  lab.beforeEach(async () => {
    countries = [{
      id: '05f9f099-9d69-4a35-9daa-b1858933961e',
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

  // A fake implementation of retrieving countries

  async function getFakeCountryCall (request, h) {
    return countries
  }

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
    await server.initialize()
  })

  // Stop server after the tests
  lab.after(async () => {
    await server.stop()
  })

  // Use a Sinon sandbox to manage spies, stubs and mocks for each test.
  lab.beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  lab.afterEach(async () => {
    await sandbox.restore()
  })

  lab.test('1 - GET /applicant/register', async () => {
    const options = {
      method: 'GET',
      url: '/applicant/register'
    }

    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - Check First Name is not null', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        firstName: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter your First name')
  })

  lab.test('3 - Check Last Name is not null', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        lastName: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter your Last name')
  })

  lab.test('4 - Check Organisation Name is not null', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        organisationName: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter an Organisation name')
  })

  lab.test('5 - Check Telephone Number is not null', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        telephoneNumber: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter your Telephone number')
  })

  lab.test('6 - Check Telephone Number is a number', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        telephoneNumber: 'Test'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter your Telephone number')
  })

  lab.test('7 - Check Email Address is not blank', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        email: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter an Email Address')
  })

  lab.test('8 - Check Address Line 1 is not Blank', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        addressLine1: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter Address line 1')
  })

  lab.test('9 - Check town is not blank', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        town: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter Town or City')
  })

  lab.test('10 - Check country has been selected', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please select Country')
  })

  lab.test('11 - Check PostCode is valid if in UK', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'United Kingdom',
        postCode: 'NE1 1RA'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('12 - Check PostCode is not blank in UK', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'United Kingdom',
        postCode: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Please enter Postcode')
  })

  lab.test('13 - Check PostCode being blank is fine if not in UK', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'Afghanistan',
        postCode: ''
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('14 - Check PostCode being filled with nonsense is fine if not in UK', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'Afghanistan',
        postCode: '&GS 7~#'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('15 - Check Password has at least 8 characters', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        Password: 'bean'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Invalid Password')
  })

  lab.test('16 - Check Password has at least 1 upper case', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'Afghanistan',
        postCode: 'ilovenode1'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Invalid Password')
  })

  lab.test('17 - Check Password has at least 1 lower case', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'Afghanistan',
        postCode: 'ILOVENODE1'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.contain('Invalid Password')
  })

  lab.test('18 - Check Password has at least 1 number', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        country: 'Afghanistan',
        postCode: 'iLove2node'
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('19 - Check terms and conditions checked', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/register',
      payload: {
        terms: true
      }
    }
    sandbox.stub(countryService, 'get').callsFake(getFakeCountryCall)
    const response = await server.inject(options, countries)
    Code.expect(response.statusCode).to.equal(200)
  })
})
