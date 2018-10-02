module.exports = [{
  method: 'GET',
  path: '/shipment-type',
  options: {
    handler: (request, h) => {
      return h.view('shipment-type')
    }
  }
}]
