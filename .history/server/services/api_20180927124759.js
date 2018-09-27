module.exports = [{
  apiCreate: function () {
    console.log('calling API PUT to create new notification')
  },
  apiEdit: function (id) {
    console.log('calling API PUT to update existing notification with id ' + id)
  }
}]
