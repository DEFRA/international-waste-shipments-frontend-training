const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')

lab.experiment('Home Tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
    server.initialize()
  })

  lab.test('GET / route works', async () => {
    const options = {
      method: 'GET',
      url: '/applicant/home'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })
})
