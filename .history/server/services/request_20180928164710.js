const http = require('http')

function request (url, path, token, method, value) {
  var options = {
    host: url,
    path: path + '\\' + value,
    method: method,
    token: token
  }

  try {
    http.request(options, function (res) {
      console.log('Status: ' + res.statusCode)
      res.on('data', function (chunk) {
        console.log('Body: ' + chunk)
        return chunk
      })
      return res.statusCode
    })
  } catch (err) {
    return {
      statusCode: 503
    }
  }
}

module.exports.request = request
