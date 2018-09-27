module.exports = [{
  method: 'GET',
  path: '/applicant/home',
  options: {
    handler: (request, h) => {
      return h.view('applicant/home', {
      })
    }
  }
}, {
  method: 'POST',
  path: '/applicant/home',
  options: {
    handler: (request, h) => {
      return h.redirect('/new-notification/competent-authority')
    }
  }
}]
