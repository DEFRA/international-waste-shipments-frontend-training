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
  // Test a route that doesnt exist
  lab.test('get /dodgy-path', async () => {
    const options = {
      method: 'POST',
      url: '/dodgy-path'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST to /authority an empty payload and expect error to show', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: { authority: 'code: Delete all' }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a component authority')
  })

  lab.test('POST to /authority an empty payload that isnt an option', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: {}
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a component authority')
  })
})
