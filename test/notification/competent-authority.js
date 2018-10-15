const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const restClient = require('../../server/services/rest-client')

lab.experiment('Competent Authority Tests', () => {
  let sandbox
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  // Stop server after the tests
  lab.after(async () => {
    await server.stop()
  })

  lab.beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  lab.afterEach(async () => {
    await sandbox.restore()
  })

  lab.test('1 - GET /notification/competent-authority route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification/competent-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - POST /notification/competent-authority with valid competent authority selected', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        authority: 'ea'
      }
    }
    sandbox.stub(restClient, 'putJson').returns()
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('./shipment-type')
  })

  lab.test('3 - POST /notification/competent-authority does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        authority: 'ea',
        type: 'recovery'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('4 - POST /notification/competent-authority does not redirect if invalid competent authority is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        authority: 'defra'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('5 - POST /notification/competent-authority when notification API is unavailable', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        authority: 'ea'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })
})