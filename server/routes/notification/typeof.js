var api = require('../../services/notification-api')

module.exports = [{
  // (GET) Start notification type
  method: 'GET',
  path: '/notification/typeof',
  options: {
    handler: (request, h) => {
      return h.view('notification/typeof', { errorMessage: false })
    }
  }
},
{
  // (GET) Find existing notification type
  method: 'GET',
  path: '/notification/typeof/{id}',
  options: {
    handler: (request, h) => {
      var note = api.getTypeOf(request.params.id)
      return note
    }
  }
},
{
  // (POST) SET Notification type
  method: 'POST',
  path: '/notification/typeof',
  options: {
    handler: (request, h) => {
      if (request.payload.typeOfShipment === undefined) {
        return h.view('notification/typeof', { errorMessage: true })
      } else {
        request.yar.set('notification', api.setTypeOf(null, request.payload.typeOfShipment))
      }
      return h.redirect('final')
    }
  }
},
{
  // (PUT) Update a notification type
  method: 'PUT',
  path: '/notification/typeof/{id}',
  options: {
    handler: (request, h) => {
      api.setTypeOf(request.params.id, request.payload.typeOfShipment)
      return true
    }
  }
}]
