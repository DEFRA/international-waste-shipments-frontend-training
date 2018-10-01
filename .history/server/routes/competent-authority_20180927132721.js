const api = require('../services/notification-api')

module.exports = [{
  method: 'GET',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority', {
        errorMessage: false
      })
    }
  }
},
{
  method: 'POST',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      let competentAuthority = request.payload.competentAuthority
      console.log(competentAuthority)

      let id = request.payload.id
      console.log(id)

      let competentAuthorites = ['ea', 'sepa', 'niea', 'nrw']

      if (!competentAuthorites.includes(competentAuthority)) {
        console.log('competent authority invalid')
        return h.view('competent-authority', {
          errorMessage: true
        }).code(400)
      } else {
        if (id !== null) {
          api.apiEdit(id)
        } else {
          api.apiCreate()
        }
        console.log('competent authority accepted')
        return h.response(competentAuthority).code(200)
      }
    }
  }
}]
