function ViewModel (countries, errors) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {}
  this.model.firstName = {
    label: {
      text: 'First name'
    },
    id: 'firstName',
    name: 'firstName'
  }

  this.model.lastName = {
    label: {
      text: 'Last name'
    },
    id: 'lastName',
    name: 'lastName'
  }

  this.model.organisationName = {
    label: {
      text: 'Organisation name'
    },
    id: 'organisationName',
    name: 'organisationName'
  }

  this.model.telephoneNumber = {
    label: {
      text: 'Telephone number'
    },
    id: 'telephoneNumber',
    name: 'telephoneNumber',
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
      text: 'Address Line 1'
    },
    id: 'addressLine1',
    name: 'addressLine1'
  }

  this.model.addressLine2 = {
    label: {
      text: 'Address Line 2'
    },
    id: 'addressLine2',
    name: 'addressLine2'
  }

  this.model.town = {
    label: {
      text: 'Town or city'
    },
    classes: 'govuk-!-width-two-thirds',
    id: 'town',
    name: 'town'
  }

  this.model.county = {
    label: {
      text: 'County (optional)'
    },
    classes: 'govuk-!-width-two-thirds',
    id: 'county',
    name: 'county'
  }

  this.model.postcode = {
    label: {
      text: 'Postcode'
    },
    classes: 'govuk-input--width-10',
    id: 'postcode',
    name: 'postcode'
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

  this.model.confirmPassword = {
    label: {
      text: 'Confirm Password'
    },
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password'
  }

  this.model.termsandconditions = {
    idPrefix: 'terms',
    name: 'termsandconditions',
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
        'text': 'Please enter your First name'
      }
    }
    if (errors.indexOf('lastName') > -1) {
      this.model.lastName.errorMessage = {
        'text': 'Please enter your Last name'
      }
    }
    if (errors.indexOf('organisationName') > -1) {
      this.model.organisationName.errorMessage = {
        'text': 'Please enter an Organisation name'
      }
    }
    if (errors.indexOf('telephoneNumber') > -1) {
      this.model.telephoneNumber.errorMessage = {
        'text': 'Please enter your Telephone number'
      }
    }
    if (errors.indexOf('email') > -1) {
      this.model.email.errorMessage = {
        'text': 'Please enter an Email Address'
      }
    }
    if (errors.indexOf('addressLine1') > -1) {
      this.model.addressLine1.errorMessage = {
        'text': 'Please enter Address line 1'
      }
    }
    if (errors.indexOf('addressLine2') > -1) {
      this.model.addressLine2.errorMessage = {
        'text': 'Please enter Address line 2'
      }
    }
    if (errors.indexOf('town') > -1) {
      this.model.town.errorMessage = {
        'text': 'Please enter Town or City'
      }
    }
    if (errors.indexOf('county') > -1) {
      this.model.county.errorMessage = {
        'text': 'Please enter County'
      }
    }
    if (errors.indexOf('postcode') > -1) {
      this.model.postcode.errorMessage = {
        'text': 'Please enter Postcode'
      }
    }
    if (errors.indexOf('country') > -1) {
      this.model.country.errorMessage = {
        'text': 'Please enter country'
      }
    }
    if (errors.indexOf('password') > -1) {
      this.model.password.errorMessage = {
        'text': 'Please enter Password'
      }
    }
    if (errors.indexOf('confirmPassword') > -1) {
      this.model.confirmPassword.errorMessage = {
        'text': 'Please enter the same Password as above'
      }
    }
    if (errors.indexOf('termsandconditions') > -1) {
      this.model.termsandconditions.errorMessage = {
        'text': 'Please accept terms and conditions of use'
      }
    }
  }
}

module.exports = ViewModel
