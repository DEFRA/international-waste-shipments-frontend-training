const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')

lab.experiment('Number Tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
    server.initialize()
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
})
