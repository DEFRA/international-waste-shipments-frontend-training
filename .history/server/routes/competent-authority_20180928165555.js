const api = require('../services/notification-api')
const ViewModel = require('../models/competent-authority.js')

const competentAuthorites = ['ea', 'sepa', 'niea', 'nrw']

module.exports = [{
  method: 'GET',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority', new ViewModel(false))
    }
  }
},
{
  method: 'POST',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      let competentAuthority = request.payload.competentAuthority
      console.log('competent authority: ' + competentAuthority)

      let id = request.payload.id
      console.log('id: ' + id)

      if (!competentAuthorites.includes(competentAuthority)) {
        console.log('competent authority invalid')
        return h.view('competent-authority', new ViewModel(true)).code(400)
      } else {
        var response = api.put(id)
        console.log('competent authority accepted')
        return h.response(competentAuthority).code(response)
      }
    }
  }
}]
