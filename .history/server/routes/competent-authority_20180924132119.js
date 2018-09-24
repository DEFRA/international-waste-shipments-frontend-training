module.exports = {
  method: 'GET',
  path: '/compentent-authority',
  options: {
    handler: (request, h) => {
      return h.view('competent-authority', {
        view: 'competent-authority'
      })
    }
  }
}

module.exports = {
  method: 'POST',
  path: '/compentent-authority',
  options: {
    handler: (request, h) => {
      var competentAuthority = request.payload.competentAuthority

      if (competentAuthority !== 'ea' || competentAuthority !== 'sepa' || competentAuthority !== 'niea' ||
      competentAuthority !== 'nrw') {
        return h.status(400)
      } else {
        return h.view('home', {
          view: 'home'
        })
      }
    }
  }
}
