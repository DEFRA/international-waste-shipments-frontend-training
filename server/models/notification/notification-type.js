function ViewModel (notificationType, error) {
  // Constructor function to create logic dependent nunjucks page

  this.model = {
    idPrefix: 'notificationtype',
    name: 'notificationtype',
    fieldset: {
      legend: {
        text: 'What type of waste shipment notification are you applying for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    items: [
      {
        value: '1',
        text: 'Recovery'
      },
      {
        value: '2',
        text: 'Disposal',
        conditional: {
          html: `If you're shipping for disposal, we advise you to contact your relevant competent authority before completing your notification application.</br></br> Environment Agency - Telephone: 03708 506 506`
        }
      }
    ]
  }

  // Check if a notification type has been added to the model. If it has, set the corresponding checked property
  if (notificationType != null) {
    let item = this.model.items.find(x => x.value === notificationType)
    if (item != null) {
      item.checked = true
    }
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
