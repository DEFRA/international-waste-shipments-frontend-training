
function notification () {
  this.id = 123
  this.competentAuthority = 'EA'
}

function getNotification (id) {
  // set the id and return this notication because we don't have a database
  notification.id = id
  return notification
}

function setCompetentAuthority (CA) {
  console.log('NotificationAPI SET CA:' + CA)
  notification.competentAuthority = CA
  return notification.competentAuthority
}

function getCompetentAuthority (id) {
  console.log('NotificationAPI GET CA for ID:' + id)
  return getNotification(id).competentAuthority
}

module.exports.getNotification = getNotification
module.exports.setCompetentAuthority = setCompetentAuthority
module.exports.getCompetentAuthority = getCompetentAuthority
