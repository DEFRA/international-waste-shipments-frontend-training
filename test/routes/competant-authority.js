const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../server')
const api = require('../../server/services/notificationApi')

lab.experiment('Web test', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /competant-authority route works', async () => {
    const options = {
      method: 'GET',
      url: '/competant-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('POST /competant-authority route works when correct authority supplied', async () => {
    var mockApiPut = sinon.stub(api, 'put').callsFake(function fakePut () {
      return {
        statusCode: 200
      }
    })

    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'ea'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    mockApiPut.restore()
  })

  lab.test('POST /competant-authority route fails when incorrect authority supplied', async () => {
    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'fbi'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('POST /competent-authority existing is updated if id supplied', async () => {
    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'ea',
        id: '1'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('POST /competent-authority calls api for new notification', async () => {
    let mockApi = sinon.mock(api)

    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'ea'
      }
    }

    server.inject(options)

    mockApi.expects('put').once()
  })
})
