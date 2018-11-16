const config = require('../../server/config')
const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const sessionCache = require('../../server/services/session-cache')

lab.experiment('Home Tests', () => {
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
    sandbox = sinon.createSandbox()
  })

  lab.afterEach(async () => {
    sandbox.restore()
  })

  lab.test('1 - GET /applicant/home route redirects without session', async () => {
    const options = {
      method: 'GET',
      url: '/applicant/home'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - GET /applicant/home route succeeds with a session', async () => {
    const options = {
      method: 'GET',
      url: '/applicant/home'
    }

    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })
})
