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
      return h.view('home', {
        view: 'home'
      })
    }
  }
}
