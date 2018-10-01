module.exports = [{
  method: 'GET',
  path: '/new-notification/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('notification/competent-authority', {
      })
    }
  }
}, {
  method: 'POST',
  path: '/new-notification/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('notification/competent-authority', {
      })
    }
  }
}]
