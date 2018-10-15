const createServer = require('./server')
require('docker-composer')

createServer()
  .then(server => server.start())
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
