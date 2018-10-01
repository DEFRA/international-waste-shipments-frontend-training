const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
const sinon = require('sinon')

// Services
const sessionApi = require('../server/services/session-api')

lab.experiment('Mocks', () => {
  // Use stubs for get to substitue the target function to simulate its behaviour
  // Mock pushs and puts as there is mulitple specific behaviours

  lab.experiment('Get-data Stub api calls:', () => {
    lab.beforeEach(async () => {
      this.consoleSpy = sinon.spy(console, 'log')
    })

    lab.afterEach(async () => {
      this.consoleSpy.restore()
      this.Stub.restore()
    })

    // The Mock API lets define different types of expectations for mocks.
    lab.test('- get the session id with differing arguments', async () => {
      this.Stub = sinon.stub(sessionApi, 'getSession')

      this.Stub.withArgs().returns({ sessionid: this.sessionId })
      this.Stub.withArgs(1).returns({ sessionid: this.sessionId })

      Code.expect(sessionApi.getSession()).to.equal({
        sessionid: this.sessionId
      })
      Code.expect(sessionApi.getSession(1)).to.equal({
        sessionid: this.sessionId
      })
    })

    lab.test('- get the notification id with differing arguments', async () => {
      this.Stub = sinon.stub(sessionApi, 'getNotification')

      this.Stub.withArgs().returns({ notificationId: this.notificationId })
      this.Stub.withArgs(1).returns({ notificationId: this.notificationId })

      Code.expect(sessionApi.getNotification()).to.equal({
        notificationId: this.notificationId
      })

      Code.expect(sessionApi.getNotification(1)).to.equal({
        notificationId: this.notificationId
      })
    })
  })

  lab.experiment('Set-data Mock api calls:', () => {
    lab.beforeEach(async () => {
      this.consoleSpy = sinon.spy(console, 'log')
    })

    lab.afterEach(async () => {
      this.consoleSpy.restore()
      this.Mock.restore()
    })

    lab.test('- set the notification id', async () => {
      this.Mock = sinon.mock(sessionApi)
      this.Mock.expects('setNotification').withExactArgs(this.sessionId).returns({ status: 204 })
      this.Mock.expects('getNotification').withExactArgs(this.sessionId).returns({ notificationId: this.notificationId })
      // 'returns(), this is what the api is going to return
      sessionApi.setNotification(this.sessionId)
      sessionApi.getNotification(this.sessionId)
      // These two calls will eventually be somewhere else and we will be making sure the mocked functions are being called appropriately
      this.Mock.verify()
    })

    lab.test('- add the authority selection to the session', async () => {
      this.Mock = sinon.mock(sessionApi)
      this.Mock.expects('addToSession').withExactArgs({ authority: 'EA' }).returns({ status: 204 })
      this.Mock.expects('getFullSession').withExactArgs({ notificationId: this.notificationId }).returns({ sessionId: this.sessionId, notificationId: this.notificationId, authority: this.authority })
      sessionApi.addToSession({ authority: 'EA' })
      sessionApi.getFullSession({ notificationId: this.notificationId })
      this.Mock.verify()
    })

    lab.test('- add the type selection to the session', async () => {
      this.Mock = sinon.mock(sessionApi)
      this.Mock.expects('addToSession').withExactArgs({ type: 'recovery' }).returns({ status: 204 })
      this.Mock.expects('getFullSession').withExactArgs({ notificationId: this.notificationId }).returns({ sessionId: this.sessionId, notificationId: this.notificationId, authority: this.authority, type: this.type })
      sessionApi.addToSession({ type: 'recovery' })
      sessionApi.getFullSession({ notificationId: this.notificationId })
      this.Mock.verify()
    })

    lab.test('- add session data to DB', async () => {
      this.Mock = sinon.mock(sessionApi)
      this.Mock.expects('pushSession').withExactArgs({ sessionId: 1, notificationId: 1, authority: 'EA', type: 'recovery' }).returns({ status: 204 })
      // Just make sure the function runs
      sessionApi.pushSession({ sessionId: 1, notificationId: 1, authority: 'EA', type: 'recovery' })
      this.Mock.verify()
    })
  })
})
