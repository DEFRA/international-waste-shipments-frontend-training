const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Happy path Test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })
  // Happy tests

  lab.test('POST /authority route works', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: { authority: 'niea' }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['location']).to.equal('./type')
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST /type route works', async () => {
    const options = {
      method: 'POST',
      url: '/type',
      payload: { type: 'recovery' }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(302)
    Code.expect(response.headers['location']).to.equal('./notification')
    Code.expect(response.headers['content-type']).to.include('text/html')
  })
})
