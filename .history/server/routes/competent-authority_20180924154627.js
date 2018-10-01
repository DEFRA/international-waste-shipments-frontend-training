module.exports = [{
  method: 'GET',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority', {
        errorMessage: ''
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

      let competentAuthorites = ['ea', 'sepa', 'niea', 'nrw']

      if (!competentAuthorites.includes(competentAuthority)) {
        console.log('competent authority invalid')
        return h.view('competent-authority', {
          errorMessage: 'Competent Authority invalid'
        }).code(400)
      } else {
        console.log('competent authority accepted')
        return h.response(competentAuthority).code(200)
      }
    }
  }
}]
