const Page = require('.')
const NOTIFICATION_NUMBER = ['notificationNumber']
const ViewModel = require('../../../models/notification/notification-id')
class NotificationIdPage extends Page {
  /* hasFormComponents (from Page.js base class) asserted true to ensure the form builder engine always provides a post handler for pages with the sidebar partial */
  constructor (model, pageDef) {
    super(model, pageDef)
    this.hasFormComponents = true
  }

  makeGetRouteHandler (getState) {
    return async (request, h) => {
      const model = this.model
      const state = await model.getState(request)
      const viewModel = new ViewModel(state[NOTIFICATION_NUMBER])
      viewModel.model.sectionTitle = 'Start'
      return h.view('notification/notification-id', viewModel)
    }
  }

  getFormDataFromState (state) {
    const formData = super.getFormDataFromState(state)
    formData[NOTIFICATION_NUMBER] = state[NOTIFICATION_NUMBER]
    return formData
  }

  // getViewModel (formData) {
  //   const viewModel = super.getViewModel(formData)
  //   viewModel[NOTIFICATION_NUMBER] = formData[NOTIFICATION_NUMBER]
  //   return viewModel
  // }
}

module.exports = NotificationIdPage
