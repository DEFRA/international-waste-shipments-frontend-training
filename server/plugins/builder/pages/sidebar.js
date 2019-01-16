const Page = require('.')
// const NOTIFICATION_NUMBER = ['notificationNumber']

class SidebarPage extends Page {
  /* hasFormComponents (from Page.js base class) asserted true to ensure the form builder engine always provides a post handler for pages with the sidebar partial */
  constructor (model, pageDef) {
    super(model, pageDef)
    this.hasFormComponents = true
  }

  // getFormDataFromState (state) {
  //   const formData = super.getFormDataFromState(state)
  //   formData[NOTIFICATION_NUMBER] = state[NOTIFICATION_NUMBER]
  //   return formData
  // }

  // getViewModel (formData) {
  //   const viewModel = super.getViewModel(formData)
  //   viewModel[NOTIFICATION_NUMBER] = formData[NOTIFICATION_NUMBER]
  //   return viewModel
  // }

  get viewName () {
    return 'sidebar-layout'
  }
}

module.exports = SidebarPage
