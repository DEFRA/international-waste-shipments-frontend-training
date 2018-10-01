function get (id) {
  console.log('calling API GET method to retrieve notification id ' + id)
}

function put (id) {
  console.log('calling API PUT to add/update notification id ' + id)
}

module.exports.get = get
module.exports.put = put
