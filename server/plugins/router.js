const routes = [].concat(
  require('../routes/applicant/home'),
  require('../routes/notification/competent-authority'),
  require('../routes/notification/shipment-type'),
  require('../routes/notification/notification-id'),
  require('../routes/public')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
