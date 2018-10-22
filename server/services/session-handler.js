function get (request, key) {
  let object = request.yar.get(key)
  if (object == null) {
    console.log(`no cached value for ${key}`)
    object = {}
  }
  return object
}

function set (request, key, value) {
  console.log(`setting cached value for ${key}`)
  request.yar.set(key, value)
}

module.exports.get = get
module.exports.set = set
