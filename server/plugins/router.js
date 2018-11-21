const routes = [].concat(
  require('../routes/applicant/home'),
  require('../routes/notification/competent-authority'),
  require('../routes/notification/notification-id'),
  require('../routes/notification/shipment-type'),
  require('../routes/public'),
  require('../routes/notification-application/organisations-involved/exporter'),
  // require('../routes/notification-application/organisations-involved/facility-list'),
  // require('../routes/notification-application/organisations-involved/facility-site-of-treatment'),
  // require('../routes/notification-application/organisations-involved/importer'),
  // require('../routes/notification-application/organisations-involved/producer-list'),
  // require('../routes/notification-application/organisations-involved/producer-site-of-export'),
  // require('../routes/notification-application/amounts-and-dates/shipment'),
  // require('../routes/notification-application/disposal-operation/reason-for-export'),
  // require('../routes/notification-application/disposal-operation/waste-operations-operation-codes'),
  // require('../routes/notification-application/disposal-operation/waste-operations-technology-employed'),
  // require('../routes/notification-application/journey/customs-office'),
  // require('../routes/notification-application/journey/state-of-export'),
  // require('../routes/notification-application/journey/state-of-import'),
  // require('../routes/notification-application/journey/transport-route-summary'),
  // require('../routes/notification-application/transportation/carrier-list'),
  // require('../routes/notification-application/transportation/means-of-transport'),
  // require('../routes/notification-application/transportation/packaging-types'),
  // require('../routes/notification-application/transportation/special-handling'),
  // require('../routes/notification-application/waste-classifications/chemical-composition'),
  // require('../routes/notification-application/waste-classifications/physical-characteristics'),
  // require('../routes/notification-application/waste-classifications/waste-generation-process'),
  // require('../routes/notification-application/waste-codes/basel-oecd-code'),
  // require('../routes/notification-application/waste-codes/custom-waste-code'),
  // require('../routes/notification-application/waste-codes/ewc-code'),
  // require('../routes/notification-application/waste-codes/h-code'),
  // require('../routes/notification-application/waste-codes/un-class'),
  // require('../routes/notification-application/waste-codes/un-number'),
  // require('../routes/notification-application/waste-codes/y-code'),
  require('../routes/partials/sidebar')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
