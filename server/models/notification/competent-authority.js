function ViewModel (competentAuthority, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    idPrefix: 'competentauthority',
    name: 'competentauthority',
    fieldset: {
      legend: {
        text: 'Which competent authority are you applying to?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    items: [
      {
        value: '1',
        text: 'Environment Agency (EA)'
      },
      {
        value: '2',
        text: 'Scottish Environment Protection Agency (SEPA)'
      },
      {
        value: '3',
        text: 'Northern Ireland Environment Agency(NIEA)'
      },
      {
        value: '4',
        text: 'Natural Resources Wales (NRW)'
      }
    ]
  }

  if (competentAuthority != null) {
    let item = this.model.items.find(x => x.value === competentAuthority)
    if (item != null) {
      item.checked = true
    }
  }

  // If error is passed to model then this error property is added to the model and therefore radio macro
  this.hasError = !!error
  if (this.hasError === true) {
    this.model.errorMessage = {
      'text': 'Please select a component authority'
    }
  }
}

module.exports = ViewModel
