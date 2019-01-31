// Generate notification number

// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
var eaNotificationCount = 1
var sepaNotificationCount = 1
var nieaNotificationCount = 1
var nrwNotificationCount = 1

module.exports = {
  generateNotificationNumber: function (competentAuthority) {
    let next = 1
    let ca = 9

    switch (competentAuthority) {
      case '1':
        next = eaNotificationCount
        eaNotificationCount++
        ca = 1
        break
      case '2':
        next = sepaNotificationCount
        sepaNotificationCount++
        ca = 2
        break
      case '3':
        next = nieaNotificationCount
        nieaNotificationCount++
        ca = 3
        break
      case '4':
        next = nrwNotificationCount
        nrwNotificationCount++
        ca = 4
        break
      default:
        next++
        break
    }

    let element1 = ca.toString().padStart(4, '0')
    let element2 = next.toString().padStart(6, '0')

    return `GB ${element1} ${element2}`
  }
}
