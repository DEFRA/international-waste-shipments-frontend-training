const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

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

  lab.test('GET /notification route works', async () => {
    const options = {
      method: 'GET',
      url: '/notification'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode, 'notifaction routing test').to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  // Notification Test - routing with POST no payload expect 404
  lab.test('POST /notification route no payload expect 404 page with status 200', async () => {
    const options = {
      method: 'POST',
      url: '/notification'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode, 'notifaction routing test').to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  // Notification Test - POST payload for selected comp authority
  lab.test('POST /notification POST CA', async () => {
    const options = {
      method: 'POST',
      url: '/notification',
      payload: { 'competentAuthority': 'EA' }

    }
    const response = await server.inject(options)
    Code.expect(response.payload, 'notifaction routing test with CA').to.contain('EA')
  })

  // Notification Test - PUT update notification
  lab.test('PUT /notification update', async () => {
    const options = {
      method: 'PUT',
      url: '/notification/1',
      payload: { 'Test': 'Update Notification' }
    }
    const response = await server.inject(options)
    Code.expect(response.payload, 'notifaction PUT update').to.contain('Update Notification')
  })
  // Notification Test - PUT create notification
  lab.test('PUT /notification create', async () => {
    const options = {
      method: 'PUT',
      url: '/notification/'
    }
    const response = await server.inject(options)
    console.log(response.payload)
    Code.expect(response.payload, 'notifaction PUT create').to.contain('Create New Notification')
  })
})
