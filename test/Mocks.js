const Lab = require('lab')
const Code = require('code')
const lab = exports.lab = Lab.script()
var sinon = require('sinon')
// const apiUrl = require('../server/routes/home')

lab.experiment('Mock Test', () => {
  lab.test('stubbing session id', async () => {
    // apiUrl  is in place of the api
    var apiUrl = {}
    // stating my obj will have a function in it to return something, we dont know what it will be called so have called it fakeFn
    apiUrl.getSesh = function () {

    }

    // sinon creates stub for my Obj.getSesh and runs fake function returning fake session ID
    sinon.stub(apiUrl, 'getSesh').callsFake(function fakeFn () {
      return {
        sessionid: 666
      }
    })

    // runs the getSesh function and code expects session id set in fake function
    apiUrl.getSesh()
    Code.expect(apiUrl.getSesh()).to.equal({
      sessionid: 666
    })
  })

  lab.test('stubbing notification id', async () => {
    // apiUrl  is in place of the api
    var apiUrl = {}
    // stating my obj will have a function in it to return something, we dont know what it will be called so have called it fakeFn
    apiUrl.notificationID = function () {

    }

    // sinon creates stub for my Obj.getSesh and runs fake function returning fake session ID
    sinon.stub(apiUrl, 'notificationID').callsFake(function fakeFn () {
      return {
        notificationID: 'GB 0001 004568'
      }
    })

    // runs the getSesh function and code expects session id set in fake function
    apiUrl.notificationID()
    Code.expect(apiUrl.notificationID()).to.equal({
      notificationID: 'GB 0001 004568'
    })
  })
})
