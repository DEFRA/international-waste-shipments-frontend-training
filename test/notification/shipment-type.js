const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const notificationApi = require('../../server/services/notification-api')
const restClient = require('../../server/services/rest-client')
const sessionCache = require('../../server/services/session-cache')
const uuid = require('uuid')

lab.experiment('Shipment Type Tests', () => {
  let sandbox
  let server

  //  A fake implementation of retrieving a session cache entry that ensures
  //  the sessiion cache entry is set as a request property.
  async function getFakeSessionCache (request, h) {
    let fakeSessionId = uuid.v4()

    let cache = {
      id: fakeSessionId
    }

    await notificationApi.get(fakeSessionId)
    request.log('info', `Got fake session ${fakeSessionId}`)
    return cache
  }

  async function getFakeSessionCacheWithNoSessionId (request, h) {
    let cache = {
    }
    return cache
  }

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

  lab.test('1 - GET /notification/shipment-type route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification/shipment-type'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - POST /notification/shipment-type succeeds with valid shipment type selected', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }
    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCache)
    sandbox.stub(restClient, 'getJson').returns({})
    sandbox.stub(restClient, 'putJson').returns()
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('./notification-id')
  })

  lab.test('3 - POST /notification/shipment-type requires a valid session', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('4 - POST /notification/shipment-type fails with null session', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }
    sandbox.stub(sessionCache, 'get').returns(null)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers.location).to.equal('/')
  })

  lab.test('5 - POST /notification/shipment-type fails with missing session ID', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }
    sandbox.stub(sessionCache, 'get').callsFake(getFakeSessionCacheWithNoSessionId)
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('6 - POST /notification/shipment-type does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        authority: 'ea',
        type: 'recovery'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('7 - POST /notification/shipment-type does not redirect if invalid shipment type is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recycle'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
