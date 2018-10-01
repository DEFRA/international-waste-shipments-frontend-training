function apiCreate () {
  console.log('calling API PUT to create new notification')
}

function apiEdit (id) {
  console.log('calling API PUT to update existing notification with id ' + id)
}

module.exports.apiCreate = apiCreate
module.exports.apiEdit = apiEdit
