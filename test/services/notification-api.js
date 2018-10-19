const Boom = require('boom')
const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const sinon = require('sinon')
const notificationService = require('../../server/services/notification-api')
const restClient = require('../../server/services/rest-client')
const uuid = require('uuid')

lab.experiment('Notification API Client', () => {
  let sandbox

  // Use a Sinon sandbox to manage spies, stubs and mocks for each test.
  lab.beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  lab.afterEach(async () => {
    await sandbox.restore()
  })

  lab.test('Non-missing resource related exeptions are propagated', async () => {
    // If the notification API is not running a Promise should be rejected.
    await Code.expect(notificationService.get(uuid.v4())).to.reject()
    // Stub the REST client rejecting a Promise with a non-Boom error to increase test coverage.
    sandbox.stub(restClient, 'getJson').rejects(new Error())
    await Code.expect(notificationService.get(uuid.v4())).to.reject()
  })

  lab.test('Missing resource related exeptions are not propagated', async () => {
    sandbox.stub(restClient, 'getJson').rejects(Boom.boomify(new Error(), { statusCode: 404 }))
    Code.expect(await notificationService.get(uuid.v4())).to.be.undefined()
  })
})
