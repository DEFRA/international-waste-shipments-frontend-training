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
  method: 'PUT',
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
          console.log('calling API to update existing notification with id ' + id)
        } else {
          console.log('calling API to create new notification')
        }
        console.log('competent authority accepted')
        return h.response(competentAuthority).code(200)
      }
    }
  }
}]