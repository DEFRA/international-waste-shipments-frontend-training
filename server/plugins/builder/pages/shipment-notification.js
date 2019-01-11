// const hoek = require('hoek')
const joi = require('joi')
const Page = require('.')
const extendedSchema = { notificationNumber: joi.string() }
// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
var notificationCount = 1

class NotificationTypePage extends Page {
  /* hasFormComponents (from Page.js base class) asserted true to ensure the form builder engine always provides a post handler for pages with the sidebar partial */
  constructor (model, pageDef) {
    super(model, pageDef)
    this.hasFormComponents = true
    this.extendedFormSchema = this.formSchema.keys(extendedSchema)
    this.extendedStateSchema = this.stateSchema.keys(extendedSchema)
  }

  validateForm (payload) {
    return this.validate(payload, this.extendedFormSchema)
  }

  validateState (newState) {
    return this.validate(newState, this.extendedStateSchema)
  }

  getNext (state) {
    return state['notificationNumber'] ? super.getNext(state) : '/notification-id'
  }

  get postRouteOptions () {
    const self = this
    return {
      ext: {
        onPostHandler: {
          method: async (request, h) => {
            await addNotificationNumberToStateIfRequired(request, self.model.getState, self.model.mergeState)
            return h.continue
          }
        }
      }
    }
  }
}

async function addNotificationNumberToStateIfRequired (request, getState, mergeState) {
  const state = getState(request)

  if (!state['notificationNumber']) {
    mergeState(request, {
      notificationNumber: generateNotificationNumber()
    })
  }
}

// FOR TRAINING PRUPOSES ON A SINGLE SERVER USE A SIMPLE VARIABLE WHEN GENERATING NOTIFICATION NUMBERS
// THIS APPROACH NEEDS REFACTORING IN DUE COURSE
function generateNotificationNumber () {
  let paddedNotificationNumber = `${notificationCount++}`.padStart(10, '0')
  return `GB ${paddedNotificationNumber}`
}

module.exports = NotificationTypePage
