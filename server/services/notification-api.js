module.exports = {
  get: async function (id) {
    console.log(`calling API GET to retrieve notification with id ${id}`)
    return {
      id: id,
      authority: 'ea'
    }
  },
  put: async function (notification) {
    console.log(`calling API PUT to add/update notification with id ${notification.id}`)
  }
}
