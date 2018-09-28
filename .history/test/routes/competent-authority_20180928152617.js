const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
const lab = exports.lab = Lab.script()
const createServer = require('../../server')
const api = require('../../server/services/notification-api')

lab.experiment('Competent Authority Tests', () => {
  let server

  // Create server before the tests
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('1 - GET /competent-authority route works', async () => {
    const options = {
      method: 'GET',
      url: '/competent-authority'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.headers['content-type']).to.include('text/html')
  })

  lab.test('2 - POST /competent-authority one competent authority selected', async () => {
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

  lab.test('3 - POST /competent-authority error if multiple competent authorities selected', async () => {
    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthorities: [{ competentAuthority: 'ea' }, { competentAuthority: 'sepa' }]
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('4 - POST /competent-authority existing is updated if id supplied', async () => {
    var mockApi = sinon.mock(api)

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
    mockApi.restore()
  })

  lab.test('5 - POST /competent-authority calls api for new notification', async () => {
    var mockApi = sinon.mock(api)

    const options = {
      method: 'POST',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'ea'
      }
    }

    server.inject(options)
    mockApi.expects('put').once()
    mockApi.restore()
  })
})
