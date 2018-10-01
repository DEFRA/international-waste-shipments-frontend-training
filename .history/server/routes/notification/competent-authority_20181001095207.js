const api = require('../../services/notification-api')
const ViewModel = require('../../models/competent-authority')
const Joi = require('joi')

const schema = {
  competentAuthority: Joi.any().valid('ea', 'sepa', 'niea', 'nrw').required()
}

module.exports = [{
  method: 'GET',
  path: '/notification/competent-authority/{id?}',
  options: {
    handler: (request, h) => {
      let notification = api.get(request.params.id)
      return h.view('competent-authority', {
        model: new ViewModel(false, notification.competentAuthority),
        id: notification.id
      })
    }
  }
},
{
  method: 'POST',
  path: '/notification/competent-authority',
  options: {
    handler: (request, h) => {
      let id = request.payload.id
      let competentAuthority = request.payload.competentAuthority
      console.log(`id: ${id} competent authority: ${competentAuthority}`)

      // If competent authortiy is not valid then return view
      // otherwise call API put method
      if (Joi.validate({ competentAuthority: competentAuthority }, schema).error != null) {
        console.log('competent authority invalid')
        return h.view('competent-authority', {
          model: new ViewModel(true, competentAuthority),
          id: id
        }).code(400)
      } else {
        console.log('competent authority accepted')
        let notification = api.get(id)
        notification.competentAuthority = competentAuthority
        let response = api.put(notification)
        return h.response(notification).code(response.statusCode)
      }
    }
  }
}]
