const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Route tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })
  // Happy tests
  lab.test('GET / route works', async () => {
    const options = {
      method: 'GET',
      url: '/'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('GET /about route works', async () => {
    const options = {
      method: 'GET',
      url: '/about'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('GET /authority route works', async () => {
    const options = {
      method: 'GET',
      url: '/authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST /authority route works', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: { authority: 'niea' }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['location']).to.equal('./')
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  // Sad tests
  lab.test('get /dodgy-path', async () => {
    const options = {
      method: 'POST',
      url: '/dodgy-path'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })
})
