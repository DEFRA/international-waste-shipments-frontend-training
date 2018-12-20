const Page = require('.')

class SidebarPage extends Page {
  /* hasFormComponents (from Page.js base class) asserted true to ensure the form builder engine always provides a post handler for pages with the sidebar partial */
  constructor (model, pageDef) {
    super(model, pageDef)
    this.hasFormComponents = true
  }

  get viewName () {
    return 'sidebar-layout'
  }
}

module.exports = SidebarPage
