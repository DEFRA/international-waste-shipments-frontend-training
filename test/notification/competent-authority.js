const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /new-notification/competent-authority route works', async () => {
    const options = {
      method: 'GET',
      url: '/new-notification/competent-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST /new-notification/competent-authority route works', async () => {
    const options = {
      method: 'POST',
      url: '/new-notification/competent-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })
})
