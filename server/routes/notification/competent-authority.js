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
{ // (POST) NOTIFICATION
  method: 'POST',
  path: '/notification/competent-authority/{id?}',
  handler: (request, h) => {
    console.log('/notification/competent-authority/{id?}')
    // If there is no payload then display error
    if (JSON.stringify(request.payload) === '{}' || request.payload === null) {
      return h.view('notification/competent-authority', { errorMessage: true })
    } else {
      request.yar.set('notification', api.setCompetentAuthority(request.params.id, request.payload.competentAuthority))
      console.log(request.yar.get('notification'))
      return h.redirect('../typeof')
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
