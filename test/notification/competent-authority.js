const config = require('../../server/config')
const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const sessionCache = require('../../server/services/session-cache')

lab.experiment('Competent Authority Tests', () => {
  let sandbox
  let server

  // A fake implementation of retrieving a valid session cache entry. Unit tests simply need a yar object
  // with an id property.

  async function getFakeSessionCache (request, h) {
    let cache = request.yar.set(config.sessionCookieName, '{}')
    request.log('info', `Got fake session ${request.yar.id}`)
    return cache
  }

  // Create server before the tests.
  lab.before(async () => {
    server = await createServer()
    await server.initialize()
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

  lab.test('1 - GET /notification/competent-authority route redirects without session', async () => {
    const options = {
      method: 'GET',
      url: '/notification/competent-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - GET /notification/competent-authority route succeeds with session', async () => {
    const options = {
      method: 'GET',
      url: '/notification/competent-authority'
    }

    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('3 - POST /notification/competent-authority with valid competent authority selected', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        competentauthority: '1'
      }
    }

    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('./notification-type')
  })

  lab.test('4 - POST /notification/competent-authority does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        competentauthority: 'ea',
        notificationtype: 'recovery'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('5 - POST /notification/competent-authority does not redirect if invalid competent authority is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        competentauthority: 'defra'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('6 - POST /notification/competent-authority when notification API is unavailable', async () => {
    // Spies, mocks and stubs are not used in this test case. If the notification API is not running
    // does the frontend application behave as expected?
    // Note: For this test to work as intended the Notification API should not be running.
    const options = {
      method: 'POST',
      url: '/notification/competent-authority',
      payload: {
        competentauthority: '1'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
  })
})
