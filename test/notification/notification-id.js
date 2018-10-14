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

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  // Stop server after the tests
  lab.after(async () => {
    await server.stop()
  })

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

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - POST /notification/notification-id clears the session and returns to the home page', async () => {
    const options = {
      method: 'POST',
      url: '/notification/notification-id',
      payload: {
        notificationId: uuid.v4()
      }
    }
    const mockSessionCache = sandbox.mock(sessionCache)
    mockSessionCache.expects('destroy').once()
    const response = await server.inject(options)
    mockSessionCache.verify()
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
