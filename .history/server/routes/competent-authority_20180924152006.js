module.exports = [{
  method: 'GET',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority', {
        view: 'competent-authority'
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

      let competentAuthorites = [{ competentAuthority: 'ea' }, { competentAuthority: 'sepa' }, { competentAuthority: 'niea' }, { competentAuthority: 'nrw' }]

      if (!(competentAuthority in competentAuthorites)) {
        console.log('competent authority invalid')
        return h.response(competentAuthority).code(400)
      } else {
        console.log('competent authority accepted')
        return h.response(competentAuthority).code(200)
      }
    }
  }
}]
