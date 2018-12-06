const handlers = {
  get: async (request, h) => {
    return h.view('applicant/cookie-policy')
  }
}

module.exports = {
  method: 'GET',
  path: '/cookie-policy',
  options: {
    description: 'Handle the page request for cookie policy',
    handler: handlers.get
  }
}
