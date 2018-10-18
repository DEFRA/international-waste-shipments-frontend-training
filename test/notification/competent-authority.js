const Lab = require('lab')
const Code = require('code')
const config = require('../../server/config')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const restClient = require('../../server/services/rest-client')
const notificationApi = require('../../server/services/notification-api')

lab.experiment('Competent Authority Tests', () => {
  let sandbox
  let server

  // Create server before the tests.
  lab.before(async () => {
    server = await createServer()
    server.initialize()
  })

  // Stop server after the tests.
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
    // Don't interact with the Notification API in a unit test. All that matters in this test case is
    // what the frontend application does in response to a stubbed successful save of notification data.
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
    // Spies, mocks and stubs are not used in this test case. If the notification API is not running
    // does the frontend application behave as expected?
    // Note: For this test to work as intended the Notification API should not be running.
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        authority: 'ea'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
  })

  lab.test('6 - Retry of POST /notification/competent-authority after a brief outage ensures the existence of a session cache entry', async () => {
    // If the Notification API has a brief outage when an attempt to  submit a competent authority is made,
    // a session without any link to a session cache entry. If the user retries to submit the competent
    // authority a session cache entry needs to be created for the existing session.
    //
    // To simulate this scenario, inject a dummy cookie and stub a null retrieval
    // from the notification API (i.e. a valid session exists but is not associated with a session
    // cache entry)
    sandbox.stub(notificationApi, 'get').returns()
    // Don't interact with the Notification API in a unit test. All that matters in this test case is
    // what the frontend application does in response to a stubbed successful save of notification data.
    sandbox.stub(restClient, 'putJson').returns()

    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      headers: {
        'Cookie': `${config.sessionCookieName}=${Buffer.from('1234').toString('base64')}; HttpOnly=true; SameSite=Strict`
      },
      payload: {
        authority: 'ea'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('./shipment-type')
  })
})
