
const config = require('../../../config')
const joi = require('joi')
const Page = require('.')

class SummaryViewModel {
  constructor (model, state) {
    const details = []

    ;[undefined].concat(model.sections).forEach((section, index) => {
      const items = []
      const sectionState = section
        ? (state[section.name] || {})
        : state

      model.pages.forEach(page => {
        if (page.section === section) {
          page.components.formItems.forEach(component => {
            items.push({
              name: component.name,
              path: component.path,
              label: component.title,
              value: component.getDisplayStringFromState(sectionState),
              url: `${page.path}?returnUrl=/summary`
            })
            if (component.list && component.list.items) {
              component.list.items.forEach(item => {
                if (item.conditional && item.conditional.componentCollection) {
                  item.conditional.componentCollection.formItems.forEach(conditionalComponent => {
                    if (!items.find(nestedItem => conditionalComponent.name === nestedItem.name) && sectionState[conditionalComponent.name]) {
                      items.push({
                        name: conditionalComponent.name,
                        path: conditionalComponent.path,
                        label: conditionalComponent.title,
                        value: conditionalComponent.getDisplayStringFromState(sectionState),
                        url: `${page.path}?returnUrl=/summary`
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })

      details.push({
        name: section && section.name,
        title: section && section.title,
        items
      })
    })

    const schema = model.makeSchema(state)
    const result = joi.validate(state, schema, { abortEarly: false })

    if (result.error) {
      this.errors = result.error.details.map(err => {
        const name = err.path[err.path.length - 1]

        return {
          path: err.path.join('.'),
          name: name,
          message: err.message
        }
      })
      this.hasErrors = true

      details.forEach(detail => {
        const sectionErr = this.errors.find(err => err.path === detail.name)

        detail.items.forEach(item => {
          if (sectionErr) {
            item.inError = true
            return
          }

          const err = this.errors.find(err => err.path === (detail.name ? (detail.name + '.' + item.name) : item.name))
          if (err) {
            item.inError = true
          }
        })
      })
    }

    this.result = result
    this.details = details
    this.state = state
    this.value = result.value
    this.debug = config.env === 'development'
  }
}

class SummaryPage extends Page {
  makeGetRouteHandler (getState) {
    return async (request, h) => {
      const model = this.model
      const state = await model.getState(request)
      const viewModel = new SummaryViewModel(model, state)
      return h.view('summary', viewModel)
    }
  }
}

module.exports = SummaryPage
