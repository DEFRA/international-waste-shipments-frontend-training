const http = require('http')

function request (url, path, token, method, value) {
  var options = {
    host: url,
    path: encodeURIComponent(`${path}/${value}`),
    method: method,
    token: token
  }

  var request = http.request(options, function (res) {
    console.log(`Status: ${res.statusCode}`)
    res.on('data', function (chunk) {
      console.log(`Body: ${chunk}`)
      return chunk
    })
    return res.statusCode
  })
  request.on('error', function (err) {
    console.log(err)
    // on error return service unavailable
    return { statusCode: 503 }
  })
}

module.exports.request = request
