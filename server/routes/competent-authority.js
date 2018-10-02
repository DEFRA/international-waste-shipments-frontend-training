const competentAuthorities = ['ea', 'sepa', 'niea', 'nrw']

module.exports = [{
  method: 'GET',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority')
    }
  }
},
{
  method: 'post',
  path: '/competent-authority',
  options: {
    handler: (request, h) => {
      let competentAuthority = request.payload.competentAuthority
      console.log('competent authority: $competentAuthority')

      if (!competentAuthorities.includes(competentAuthority)) {
        console.log('error')
        return h.view('competent-authority').code(400)
      } else {
      }
    }
  }
}]
