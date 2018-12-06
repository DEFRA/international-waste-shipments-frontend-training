const config = require('../../server/config')
const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const restClient = require('../../server/services/rest-client')
const sessionCache = require('../../server/services/session-cache')

lab.experiment('Notification Type Tests', () => {
  let sandbox
  let server

  // A fake implementation of retrieving a valid session cache entry. Unit tests simply need a yar object
  // with an id property.

  async function getFakeSessionCache (request, h) {
    let cache = request.yar.set(config.sessionCookieName, '{}')
    request.log('info', `Got fake session ${request.yar.id}`)
    return cache
  }

  async function getFakeSessionCacheWithNoSessionId (request, h) {
    let cache = {
      // A cache entry with no id property is used to test error handling.
    }
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
    sandbox = sinon.createSandbox()
  })

  lab.afterEach(async () => {
    sandbox.restore()
  })

  lab.test('1 - GET /notification/notification-type redirects without session', async () => {
    const options = {
      method: 'GET',
      url: '/notification/notification-type'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - GET /notification/notification-type succeeds with session', async () => {
    const options = {
      method: 'GET',
      url: '/notification/notification-type'
    }

    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('3 - POST /notification/notification-type succeeds with valid notification type selected', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        notificationtype: '2'
      }
    }
    // Test needs a fake sessionCache to exist n order to succeed. All that matters in this test case is
    // what the frontend application does in response to stubbed successful retrieval and saving of
    // notification data.
    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    sandbox.stub(restClient, 'postJson').returns()
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('./notification-id')
  })

  lab.test('4 - POST /notification/notification-type requires a valid session', async () => {
    // Spies, mocks and stubs are not used in this test case. As such no session should be present.
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        notificationtype: '2'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('5 - POST /notification/notification-type fails with null session', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        notificationtype: '1'
      }
    }
    // Does the frontend application respond as expected if the session cache returns a null value?
    sandbox.stub(sessionCache, 'get').returns(null)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('6 - POST /notification/notification-type fails with missing session ID', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        notificationtype: '1'
      }
    }
    // Does the frontend application respond as expected if the session cache returns an entry with no
    // id property?
    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCacheWithNoSessionId)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('7 - POST /notification/notification-type does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        competentauthority: '1',
        notificationtype: '2'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('8 - POST /notification/notification-type does not redirect if invalid notification type is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-type',
      payload: {
        notificationtype: 'recycle'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
