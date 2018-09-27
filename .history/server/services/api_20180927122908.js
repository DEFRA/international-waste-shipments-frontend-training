module.exports = [{
  apiCreate: () => {
    console.log('calling API PUT to create new notification')
  },
  apiEdit: (id) => {
    console.log('calling API PUT to update existing notification with id ' + id)
  }
}]
