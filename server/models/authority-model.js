function ViewModel (error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    idPrefix: 'authority',
    name: 'authority',
    fieldset: {
      legend: {
        text: 'Which competent authority are you applying to?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--xl'
      }
    },
    items: [
      {
        value: 'ea',
        text: 'Environment Agency (EA)'
      },
      {
        value: 'sepa',
        text: 'Scotish Environment Protection Agency (SEPA)'
      },
      {
        value: 'niea',
        text: 'Northern Ireland Environment Agency(NIEA)'
      },
      {
        value: 'nrw',
        text: 'Natural Resources Wales (NRW)'
      }
    ]
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
