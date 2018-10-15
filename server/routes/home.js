module.exports = {
  method: 'GET',
  path: '/',
  options: {
    handler: (request, h) => {
      request.yar.reset()
      let requirement = {}
      request.yar.set('requirement', requirement)
      return h.view('home')
    }
  }
}
