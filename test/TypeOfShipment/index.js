const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const service = require('../../server/services/notification-api')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /typeof route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification/typeof'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('GET /typeof/2 route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification/typeof/2'
    }

    const response = await server.inject(options)
    Code.expect(response.payload).to.contains('Recovery')
  })

  lab.test('PUT /typeof/2 route works', async () => {
    const options = {
      method: 'PUT',
      url: '/notification/typeof/2',
      payload: { 'type': 'Recovery' }
    }
    var spy = sinon.spy(service, 'setTypeOf')
    const response = await server.inject(options)
    // Code.expect(response.payload).to.contains('Recovery')
    sinon.assert.calledOnce(spy)
    spy.restore()
  })
})

// module.exports.exists = exists
