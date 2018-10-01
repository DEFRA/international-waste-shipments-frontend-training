const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Sad Path Test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('get /non-existent and 404 page should return', async () => {
    const options = {
      method: 'POST',
      url: '/non-existent'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(404)
  })

  lab.test('POST to /authority an injection attack and expect error to show', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: { authority: 'SELECT * Delete *' }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a component authority')
  })

  lab.test('POST to /authority an empty payload that isnt an option and expect a 200 authority page containing appropriate error', async () => {
    const options = {
      method: 'POST',
      url: '/authority',
      payload: {}
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a component authority')
  })

  lab.test('POST to /type an injection attack and expect error to show', async () => {
    const options = {
      method: 'POST',
      url: '/type',
      payload: { type: 'SELECT * Delete *' }
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a waste shipment notification method')
  })

  lab.test('POST to /type an empty payload that isnt an option and expect a 200 authority page containing appropriate error', async () => {
    const options = {
      method: 'POST',
      url: '/type',
      payload: {}
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.payload).to.include('Please select a waste shipment notification method')
  })
})
