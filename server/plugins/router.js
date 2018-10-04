const routes = [].concat(
  require('../routes/home'),
  require('../routes/about'),
  require('../routes/public'),
  require('../routes/notification/competent-authority'),
  require('../routes/notification/typeof'),
  require('../routes/notification/final')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
