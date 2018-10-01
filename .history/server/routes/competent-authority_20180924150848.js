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
      console.log(JSON.stringify(competentAuthority))

      if (competentAuthority === null || competentAuthority !== 'ea' || competentAuthority !== 'sepa' || competentAuthority !== 'niea' ||
      competentAuthority !== 'nrw') {
        return h.response(competentAuthority).code(400)
      } else {
        return h.response(competentAuthority).code(200)
      }
    }
  }
}]
