var api = require('../../services/notification-api')

module.exports = [{
  // (GET) Start of notification user journey
  method: 'GET',
  path: '/notification/competent-authority',
  options: {
    handler: (request, h) => {
      return h.view('notification/competent-authority', { errorMessage: false })
    }
  }
},
{ // (POST) CREATE NEW NOTIFICATION
  method: 'POST',
  path: '/notification/competent-authority/{id?}',
  handler: (request, h) => {
    var requirement = request.yar.get('requirement', false)
    if (requirement === null) {
      requirement = {}
    }
    console.log('Routing - Payload = ' + JSON.stringify(request.payload))
    // If there is no payload then display error
    if (JSON.stringify(request.payload) === '{}' || request.payload === null) {
      console.log('Display error')
      return h.view('notification/competent-authority', { errorMessage: true })
    } else {
      if (request.params.id === '') {
        console.log('no id, request.payload.competentAuthority:' + request.payload.competentAuthority)
        api.setCompetentAuthority(null, request.payload.competentAuthority)
        requirement.authority = request.payload.competentAuthority
        request.yar.set('requirement', requirement)
        return h.redirect('../typeof')
      } else {
        console.log('id recieved update existing notfication with:' + request.payload.competentAuthority)
        requirement.authority = request.payload.competentAuthority
        requirement.id = request.params.id
        request.yar.set('requirement', requirement)
        return api.setCompetentAuthority(request.params.id, request.payload.competentAuthority)
      }
    }
  }
},
{ // PUT METHOD UPDATE A NOTIFICATION
  method: 'PUT',
  path: '/notification/competent-authority/{id}',
  handler: (request, h) => {
    console.log('Routing - Payload = ' + JSON.stringify(request.payload))
    if (request.params.id === null) {
      console.log('throw error')
      return h.view('500')
    } else {
      console.log('update an existing notification')

      return request.payload
    }
  }
}]
