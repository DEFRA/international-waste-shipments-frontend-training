
module.exports = {
  plugin: require('hapi-alive'),
  options: {
    responses: {
      healthy: {
        message: 'Healthy'
      },
      unhealthy: {
        statusCode: 400
      }
    }
  }
}
