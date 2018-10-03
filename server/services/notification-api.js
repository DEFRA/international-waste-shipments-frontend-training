
function getNotification (ID) {
  var notification = {
    id: ID,
    competentAuthority: 'EA',
    type: 'Recovery',
    get getID () {
      return this.id
    },
    set setID (ID) {
      this.id = ID
    },
    get getCompAuth () {
      return this.competentAuthority
    },
    set setCompAuth (compAuth) {
      this.competentAuthority = compAuth
    },
    get typeOf () {
      return this.typea
    },
    set typeOf (type) {
      this.type = type
    }
  } // set the id and return this notication because we don't have a database
  return notification
}

function setCompetentAuthority (id, CA) {
  console.log('NotificationAPI SET CA:' + CA)
  if (id === null) {
    // generate a new id
    id = 'GB123'
  }
  let notification = getNotification(id)
  notification.setCompAuth = CA
  return notification.getCompAuth
}

function getCompetentAuthority (id) {
  console.log('NotificationAPI GET CA for ID:' + id)
  return getNotification(id).getCompAuth
}

function setTypeOf (id, type) {
  console.log('NotificationAPI SET type:' + type)
  if (id === null) {
    // generate a new id
    id = 'GB123'
  }
  let notification = getNotification(id)
  notification.type = type
  console.log('NotificatonAPI type = ' + notification.type)

  return notification.type
}

function getTypeOf (id) {
  console.log('NotificationAPI GET type for ID:' + id)
  return getNotification(id).type
}

module.exports.getNotification = getNotification
module.exports.setCompetentAuthority = setCompetentAuthority
module.exports.getCompetentAuthority = getCompetentAuthority
module.exports.getTypeOf = getTypeOf
module.exports.setTypeOf = setTypeOf
