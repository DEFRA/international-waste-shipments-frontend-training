var api = require('../../services/notification-api')

module.exports = [{
  // (GET) Start of notification user journey
  method: 'GET',
  path: '/notification/typeof',
  options: {
    handler: (request, h) => {
      return h.view('notification/typeof', { errorMessage: false })
    }
  }
},
{
  // (GET) Start of notification user journey
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
  // (POST) Start of notification user journey
  method: 'POST',
  path: '/notification/typeof',
  options: {
    handler: (request, h) => {
      if (request.payload.typeOfShipment === undefined) {
        return h.view('notification/typeof', { errorMessage: true })
      } else {
        api.setTypeOf(null, request.payload.typeOfShipment)
      }
      return request.payload
    }
  }
},
{
  // (PUT) Start of notification user journey
  method: 'PUT',
  path: '/notification/typeof/{id}',
  options: {
    handler: (request, h) => {
      api.setTypeOf(request.params.id, request.payload.typeOfShipment)
      return true
    }
  }
}]
