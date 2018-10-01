const http = require('http')

function request (url, path, token, method, value) {
  var options = {
    host: url,
    path: path,
    method: method,
    token: token
  }

  http.request(options, function (res) {

  })
}
