const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')
const sinon = require('sinon')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /shipment-type route works', async () => {
    const options = {
      method: 'GET',
      url: '/shipment-type'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST /shipment-type route works when correct type supplied', async () => {
    const options = {
      method: 'POST',
      url: '/shipment-type',
      payload: {
        shipmentType: 'Recovery'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('POST /shipment-type route fails when incorrect type supplied', async () => {
    const options = {
      method: 'POST',
      url: '/shipment-type',
      payload: {
        shipmentType: 'fbi'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('POST /shipment-type api mocking', async () => {
    const options = {
      method: 'post',
      url: '/shipment-type',
      payload: {
        shipmentType: 'recovery'
      }
    }
    let mockApi = sinon.mock(require('../../server/services/notificationApi'))

    server.inject(options)

    mockApi.expects('put').once()
  })
})
