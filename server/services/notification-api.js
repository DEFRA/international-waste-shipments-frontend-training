
function notification () {
  this.id = 'GB098'
  this.competentAuthority = 'EA'
}

function getNotification (id) {
  // set the id and return this notication because we don't have a database
  notification.id = id
  return notification
}

function setCompetentAuthority (id, CA) {
  console.log('NotificationAPI SET CA:' + CA)
  if (id === null) {
    // generate a new id
    notification.id = 'GB123'
  } else {
    notification.competentAuthority = CA
    console.log('NotificatonAPI Comp Auth = ' + notification.competentAuthority)
  }
  return notification.competentAuthority
}

function getCompetentAuthority (id) {
  console.log('NotificationAPI GET CA for ID:' + id)
  return getNotification(id).competentAuthority
}

module.exports.getNotification = getNotification
module.exports.setCompetentAuthority = setCompetentAuthority
module.exports.getCompetentAuthority = getCompetentAuthority
