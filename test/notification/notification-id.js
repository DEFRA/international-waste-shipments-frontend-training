const config = require('../../server/config')
const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const sessionCache = require('../../server/services/session-cache')
const uuid = require('uuid')

lab.experiment('Number Tests', () => {
  let sandbox
  let server

  async function getFakeSessionCache (request, h) {
    let cache = request.yar.set(config.sessionCookieName, '{notificationNumber: 1}')
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

  lab.test('1 - GET /notification/notification-id route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification/notification-id'
    }
    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    // Use a mock to specify that the destroy function of the session cache should be called.
    const mockSessionCache = sandbox.mock(sessionCache)
    mockSessionCache.expects('destroy').once()
    const response = await server.inject(options)
    // Verify that the expections specified on the mock were met. If this call is missed the
    // test will pass regardless of whether or not the destroy function is called.
    mockSessionCache.verify()
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - GET /notification/notification-id requires a valid session', async () => {
    const options = {
      method: 'GET',
      url: '/notification/notification-id'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('2 - POST /notification/notification-id clears the session returns to the home page', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-id',
      payload: {
        notificationId: uuid.v4()
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('3 - POST /notification/notification-id does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-id',
      payload: {
        notificationId: 1
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
