const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const sinon = require('sinon')
const notificationService = require('../../server/services/notification-api')
const uuid = require('uuid')

lab.experiment('Home Tests', () => {
  let sandbox

  // Use a Sinon sandbox to manage spies, stubs and mocks for each test.
  lab.beforeEach(async () => {
    sandbox = await sinon.createSandbox()
  })

  lab.afterEach(async () => {
    await sandbox.restore()
  })

  lab.test('Non-missing resource related exeptions are propagated', async () => {
    // Spies, mocks and stubs are not used in this test case. If the notification API is not running
    // a Promise should be rejected.
    await Code.expect(notificationService.get(uuid.v4())).to.reject()
  })
})
