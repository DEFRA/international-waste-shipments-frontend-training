const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/public'),
  require('../routes/applicant/home'),
  require('../routes/notification/competent-authority')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
