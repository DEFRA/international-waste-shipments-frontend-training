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

  const urls = [
    '/',
    '/about',
    '/authority',
    '/type',
    '/notificationId'
  ]

  urls.forEach(url => {
    lab.test('GET ' + url, async () => {
      const options = {
        method: 'GET',
        url: url
      }
      const response = await server.inject(options)
      Code.expect(response.statusCode).to.equal(200)
      Code.expect(response.headers['content-type']).to.include('text/html')
    })
  })
})
