module.exports = [{
  method: 'GET',
  path: '/notification',
  options: {
    handler: (request, h) => {
      return h.view('competentAuthority', { errorMessage: '' })
    }
  }
},
{ // (POST) set competent authority navigating to a specific path
  // The result of this design will be a lot of different methods/paths one for each stage of the user journey
  method: 'POST',
  path: '/notification/CompAuth',
  handler: (request, h) => {
    console.log('Routing - Payload = ' + JSON.stringify(request.payload))
    console.log(request.payload)
    if (JSON.stringify(request.payload) === '{}') {
      console.log('Throw an error')
      return h.view('competentAuthority', { errorMessage: true })
    } else {
      console.log('set the competent authority')
    }
    return request.payload
  }
},
{ // (POST) set competent authority navigating to single path
  // The result of this design will be a long method with a lot of if statements to identify the stage in the user journey
  method: 'POST',
  path: '/notification',
  handler: (request, h) => {
    console.log('Routing - Payload = ' + JSON.stringify(request.payload))
    // If there is no payload then display error
    if (JSON.stringify(request.payload) === '{}') {
      console.log('Display error')
      return h.view('competentAuthority', { errorMessage: true })
    // If the payload is for CA then set the value
    } else if (JSON.stringify(request.payload).indexOf('competentAuthority') > -1) {
      console.log('set the competent authority')
      return request.payload
    }
    // if there is no match throw error and go to 404
    console.log('/notificaiton routing issue return 404')
    return h.view('404')
  }
},
{ // PUT METHOD FOR UPDATING A NOTIFICATION
  method: 'PUT',
  path: '/notification/{id}',
  handler: (request, h) => {
    console.log('Routing - Payload = ' + JSON.stringify(request.payload))
    if (request.params.id == null) {
      console.log('throw error')
      return h.view('404')
    } else {
      console.log('update an existing notification')
      return request.payload
    }
  }
},
{ // PUT METHOD FOR UPDATING A NOTIFICATION
  method: 'PUT',
  path: '/notification/',
  handler: (request, h) => {
    console.log('PUT /notification/ - Payload = ' + JSON.stringify(request.payload))
    if (request.params.id == null) {
      console.log('create a new notification')
      return 'Create New Notification'
    } else {
      return h.view('404')
    }
  }
}]
