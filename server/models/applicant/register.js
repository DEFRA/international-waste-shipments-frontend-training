function ViewModel (countries, errors) {
  // Constructor function to create logic dependent nunjucks page

  this.model = {}
  this.model.firstName = {
    label: {
      text: 'First name'
    },
    id: 'first-name',
    name: 'first-name'
  }

  this.model.lastName = {
    label: {
      text: 'Last name'
    },
    id: 'last-name',
    name: 'last-name'
  }

  this.model.organisationName = {
    label: {
      text: 'Organisation name'
    },
    id: 'organisation-name',
    name: 'organisation-name'
  }

  this.model.telephoneNumber = {
    label: {
      text: 'Telephone number'
    },
    id: 'telephone-number',
    name: 'telephone-number',
    type: 'tel',
    classes: 'govuk-input--width-20'
  }

  this.model.email = {
    label: {
      text: 'Email address'
    },
    id: 'email',
    name: 'email',
    type: 'email'
  }

  this.model.addressLine1 = {
    label: {
      html: 'Building and street <span class="govuk-visually-hidden">line 1 of 2</span>'
    },
    id: 'address-line-1',
    name: 'address-line-1'
  }

  this.model.addressLine2 = {
    label: {
      html: '<span class="govuk-visually-hidden">Building and street line 2 of 2</span>'
    },
    id: 'address-line-2',
    name: 'address-line-2'
  }

  this.model.town = {
    label: {
      text: 'Town or city'
    },
    classes: 'govuk-!-width-two-thirds',
    id: 'address-town',
    name: 'address-town'
  }

  this.model.county = {
    label: {
      text: 'County'
    },
    classes: 'govuk-!-width-two-thirds',
    id: 'address-county',
    name: 'address-county'
  }

  this.model.postcode = {
    label: {
      text: 'Postcode'
    },
    classes: 'govuk-input--width-10',
    id: 'address-postcode',
    name: 'address-postcode'
  }
  // Country needs an if statement to pull each item in the list across
  this.model.country = {
    items: [] }

  this.model.password = {
    hint: {
      text: 'Please check that your password has at least 8 characters and contains at least one upper case letter, one lower case letter and one number'
    },
    label: {
      text: 'Password'
    },
    id: 'password',
    name: 'password',
    type: 'password'
  }

  this.model.confirmpassword = {
    label: {
      text: 'Confirm Password'
    },
    id: 'confirmpassword',
    name: 'confirmpassword',
    type: 'password'
  }

  this.model.termsandconditions = {
    items: [
      {
        value: 'termsandconditions',
        text: 'Accept terms and conditions of use'
      }
    ]
  }

  countries.forEach(country => {
    this.model.country.items.push({ value: country.id, text: country.name, selected: country.name === 'United Kingdom' })
  })

  if (errors != null) {
    if (errors.indexOf('firstName') > -1) {
      this.model.firstName.errorMessage = {
        'text': 'Please enter First name'
      }
    }
    if (errors.indexOf('lastName') > -1) {
      this.model.lastName.errorMessage = {
        'text': 'Please enter Last name'
      }
    }
    if (errors.indexOf('organisationName') > -1) {
      this.model.organisationName.errorMessage = {
        'text': 'Please enter Organisation name'
      }
    }
    if (errors.indexOf('organisationName') > -1) {
      this.model.organisationName.errorMessage = {
        'text': 'Please enter Organisation name'
      }
    }
  }
}

module.exports = ViewModel
