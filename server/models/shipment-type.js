function ViewModel (error, shipmentType) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    idPrefix: 'shipmentType',
    name: 'shipmentType',
    fieldset: {
      legend: {
        text: 'What type of waste shipment notification are you applying for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    items: [
      {
        value: 'recovery',
        text: 'Recovery'
      },
      {
        value: 'disposal',
        text: 'Disposal'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model and therefore radio macro
  this.hasError = !!error
  if (this.hasError === true) {
    this.model.errorMessage = {
      'text': 'Please select a waste shipment type'
    }
  }

  if (shipmentType != null) {
    let item = this.model.items.find(x => x.value === shipmentType)
    if (item != null) {
      item.checked = true
    }
  }
}

module.exports = ViewModel
