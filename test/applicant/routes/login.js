const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../../../server')

lab.experiment('Login Tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
    await server.initialize()
  })

  // Stop server after the tests
  lab.after(async () => {
    await server.stop()
  })

  lab.test('1 - GET / redirects to login page', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['content-type']).to.include('text/html')
    Code.expect(response.headers.location).to.equal('/applicant/login')
  })

  lab.test('2 - GET /applicant/login route works', async () => {
    const options = {
      method: 'GET',
      url: '/applicant/login'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('3 - POST /applicant/login does not redirect if invalid payload is submitted', async () => {
    const options = {
      method: 'POST',
      url: '/applicant/login',
      payload: {
        email: 'invalid@test.co.uk',
        password: 'password'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })
})
