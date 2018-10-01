const http = require('http')

function request (url, path, token, method, value) {
  var options = {
    host: url,
    path: path + '\\' + value,
    method: method,
    token: token
  }

  var request = http.request(options, function (res) {
      console.log('Status: ' + res.statusCode)
      res.on('data', function (chunk) {
        console.log('Body: ' + chunk)
        return chunk
      })
  } }
}

module.exports.request = request
