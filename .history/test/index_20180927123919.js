const Lab = require('lab')
const Code = require('code')
const sinon = require('sinon')
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

  lab.test('PUT /competent-authority one competent authority selected', async () => {
    const options = {
      method: 'PUT',
      url: '/competent-authority',
      payload: {
        competentAuthority: 'ea'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
  })

  lab.test('POST /competent-authority error if multiple competent authorities selected', async () => {
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

  it('POST /competent-authority calls api for new notification', function () {
    const api = require('../server/services/api')
    var callback = sinon.fake()
    var proxy = api.apiCreate(callback)

    proxy()

    assert(callback.calledOnce)
  })
})