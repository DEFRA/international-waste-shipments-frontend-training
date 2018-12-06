const routes = [].concat(
  require('../routes/applicant/home'),
  require('../routes/applicant/cookie-policy'),
  require('../routes/notification/competent-authority'),
  require('../routes/notification/notification-id'),
  require('../routes/notification/shipment-type'),
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
