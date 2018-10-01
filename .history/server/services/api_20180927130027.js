function apiCreate (callback) {
  console.log('calling API PUT to create new notification')
  callback()
}

function apiEdit (id, callback) {
  console.log('calling API PUT to update existing notification with id ' + id)
  callback()
}

module.exports.apiCreate = apiCreate
module.exports.apiEdit = apiEdit
