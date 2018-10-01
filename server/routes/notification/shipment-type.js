const api = require('../../services/notification-api')
const ViewModel = require('../../models/shipment-type')
const Joi = require('joi')

const schema = {
  shipmentType: Joi.any().valid('recovery', 'disposal').required()
}

module.exports = [{
  method: 'GET',
  path: '/notification/shipment-type/{id}',
  options: {
    handler: (request, h) => {
      let notification = api.get(request.params.id)
      return h.view('notification/shipment-type', {
        model: new ViewModel(false, notification.shipmentType),
        id: notification.id
      })
    }
  }
},
{
  method: 'POST',
  path: '/notification/shipment-type',
  options: {
    handler: (request, h) => {
      let id = request.payload.id
      let shipmentType = request.payload.shipmentType
      console.log(`id: ${id} shipment type: ${shipmentType}`)

      // If shipment type is not valid then return view
      // otherwise call API put method
      if (Joi.validate({ shipmentType: shipmentType }, schema).error != null) {
        console.log('waste shipment type invalid')
        return h.view('notification/shipment-type', {
          model: new ViewModel(true, shipmentType),
          id: id
        }).code(400)
      } else {
        console.log('waste shipment type accepted')
        let notification = api.get(id)
        notification.shipmentType = shipmentType
        let response = api.put(notification)
        if (response.statusCode === 200) {
          return h.redirect(`/notification/number/${id}`)
        } else {
          throw new Error()
        }
      }
    }
  }
}]
