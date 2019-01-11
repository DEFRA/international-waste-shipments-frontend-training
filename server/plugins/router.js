const routes = [].concat(
  require('../routes/index'),
  require('../routes/applicant/home'),
  require('../routes/applicant/cookie-policy'),
  require('../routes/applicant/login'),
  require('../routes/applicant/register'),
  require('../routes/notification/competent-authority'),
  require('../routes/notification/notification-id'),
  require('../routes/notification/notification-type'),
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
