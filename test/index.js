const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../server')
const notificationAPI = require('../server/services/notification-api')

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
      url: '/notification/competent-authority'
    }
    const response = await server.inject(options)
    Code.expect(response.statusCode, 'notifaction routing test').to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  // Notification Test - routing with POST no payload expect 404
  lab.test('POST /notification route no payload expect 404 page with status 200', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority'
    }
    const response = await server.inject(options)
    console.log('The Status code ' + response.statusCode)
    Code.expect(response.statusCode, 'notifaction routing test').to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  // Notification Test - POST payload for selected comp authority
  lab.test('POST /notification POST CA', async () => {
    const options = {
      method: 'POST',
      url: '/notification/competent-authority/',
      payload: { 'competentAuthority': 'EA' }

    }
    const response = await server.inject(options)
    Code.expect(response.payload, 'notifaction routing test with CA').to.contain('{"competentAuthority":"EA"}')
  })

  // Notification Test - PUT update notification
  lab.test('PUT /notification update', async () => {
    const options = {
      method: 'PUT',
      url: '/notification/competent-authority/2',
      payload: { 'competentAuthority': 'SEPA' }
    }
    const response = await server.inject(options)
    Code.expect(response.payload, 'notifaction PUT update').to.contain('{"competentAuthority":"SEPA"}')
  })

  // Notification API CALL TEST - POST payload
  lab.test('POST /notification CA and Spy Notification API', async () => {
    var notificactionSpy = sinon.spy(notificationAPI, 'setCompetentAuthority')
    const options = {
      method: 'POST',
      url: '/notification/competent-authority/',
      payload: { 'competentAuthority': 'EA' }
    }
    const response = await server.inject(options)
    Code.expect(response.payload, 'notifaction routing test with CA').to.contain('{"competentAuthority":"EA"}')

    sinon.assert.calledOnce(notificactionSpy)
    notificactionSpy.restore()
  })
  // Notification API CALL TEST - POST payload
  lab.test('POST /notification CA and Spy NotificationAPI with notifiaction id', async () => {
    var notificactionSpy = sinon.spy(notificationAPI, 'setCompetentAuthority')
    const options = {
      method: 'POST',
      url: '/notification/competent-authority/GB123',
      payload: { 'competentAuthority': 'SEPA' }
    }
    const response = await server.inject(options)
    console.log('reponse payload test 8' + response.payload)
    Code.expect(response.payload, 'notifaction routing test with CA').to.contain('SEPA')

    sinon.assert.calledOnce(notificactionSpy)
    notificactionSpy.restore()
  })
})
