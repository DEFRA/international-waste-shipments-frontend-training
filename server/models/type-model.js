function ViewModel (error) {
  // Constructor function to create logic dependent nunjucks page

  this.model = {
    idPrefix: 'type',
    name: 'type',
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
        text: 'Disposal',
        conditional: {
          html: `If you're shipping for disposal, we advise you to contact your relevant competent authority before completing your notification application.</br></br> Environment Agency - Telephone: 03708 506 506`
        }
      }
    ]
  }

  // If error is passed to model then this error property is added to the model and therefore radio macro
  this.hasError = !!error
  if (this.hasError === true) {
    this.model.errorMessage = {
      'text': 'Please select a waste shipment notification method'
    }
  }
}

module.exports = ViewModel
