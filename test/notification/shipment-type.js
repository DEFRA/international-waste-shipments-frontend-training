const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const api = require('../../server/services/notification-api')

lab.experiment('Shipment Type Tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
    server.initialize()
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

  lab.test('2 - POST /notification/shipment-type one type selected', async () => {
    var mockApiPut = sinon.stub(api, 'put').callsFake(function fakePut () {
      return {
        statusCode: 200
      }
    })

    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    mockApiPut.restore()
  })

  lab.test('3 - POST /notification/shipment-type calls api for new notification', async () => {
    var mockApi = sinon.mock(api)

    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        type: 'recovery'
      }
    }

    server.inject(options)
    mockApi.expects('put').once()
    mockApi.restore()
  })

  lab.test('4 - POST /notification/shipment-type error if multiple competent authorities selected', async () => {
    const options = {
      method: 'POST',
      url: '/notification/shipment-type',
      payload: {
        types: [{ type: 'recovery' }, { type: 'disposal' }]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
