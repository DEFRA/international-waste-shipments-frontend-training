function ViewModel (countries, errors, register) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {}
  this.model.firstName = {
    label: {
      text: 'First name'
    },
    classes: 'govuk-input--width-20',
    id: 'firstName',
    name: 'firstName'
  }

  this.model.lastName = {
    label: {
      text: 'Last name'
    },
    classes: 'govuk-input--width-20',
    id: 'lastName',
    name: 'lastName'
  }

  this.model.organisationName = {
    label: {
      text: 'Organisation name'
    },
    classes: 'govuk-input--width-20',
    id: 'organisationName',
    name: 'organisationName'
  }

  this.model.telephoneNumber = {
    label: {
      text: 'Telephone number'
    },
    classes: 'govuk-input--width-20',
    id: 'telephoneNumber',
    name: 'telephoneNumber',
    type: 'text'
  }

  this.model.email = {
    label: {
      text: 'Email address'
    },
    classes: 'govuk-input--width-20',
    id: 'email',
    name: 'email',
    type: 'email'
  }

  this.model.addressLine1 = {
    label: {
      text: 'Address Line 1'
    },
    classes: 'govuk-input--width-20',
    id: 'addressLine1',
    name: 'addressLine1'
  }

  this.model.addressLine2 = {
    label: {
      text: 'Address Line 2'
    },
    classes: 'govuk-input--width-20',
    id: 'addressLine2',
    name: 'addressLine2'
  }

  this.model.town = {
    label: {
      text: 'Town or city'
    },
    classes: 'govuk-input--width-20',
    id: 'town',
    name: 'town'
  }

  this.model.county = {
    label: {
      text: 'County (optional)'
    },
    classes: 'govuk-input--width-20',
    id: 'county',
    name: 'county'
  }

  this.model.postcode = {
    label: {
      text: 'Postcode'
    },
    classes: 'govuk-input--width-20',
    id: 'postcode',
    name: 'postcode'
  }
  // Country needs an if statement to pull each item in the list across
  this.model.country = {
    label: {
      text: 'Country'
    },
    classes: 'govuk-input--width-20',
    id: 'country',
    name: 'country',
    items: [] }

  this.model.password = {
    hint: {
      text: 'Please check that your password has at least 8 characters and contains at least one upper case letter, one lower case letter and one number'
    },
    label: {
      text: 'Password'
    },
    classes: 'govuk-input--width-20',
    id: 'password',
    name: 'password',
    type: 'password'
  }

  this.model.confirmPassword = {
    label: {
      text: 'Confirm Password'
    },
    classes: 'govuk-input--width-20',
    id: 'confirmPassword',
    name: 'confirmPassword',
    type: 'password'
  }

  this.model.termsandconditions = {
    idPrefix: 'terms',
    name: 'termsandconditions',
    items: [
      {
        value: 'agree',
        text: 'Accept terms and conditions of use'
      }
    ]
  }

  let selectedCountry = 'United Kingdom'
  if (errors != null && register.country != null) {
    selectedCountry = register.country
  }

  countries.forEach(country => {
    this.model.country.items.push({ value: country.id, text: country.name, selected: selectedCountry === 'United Kingdom' ? country.name === selectedCountry : country.id === selectedCountry })
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
        'text': 'Please enter Country'
      }
    }
    if (errors.indexOf('password') > -1) {
      this.model.password.errorMessage = {
        'text': 'Invalid Password'
      }
    }
    if (errors.indexOf('confirmPassword') > -1) {
      this.model.confirmPassword.errorMessage = {
        'text': 'Passwords must match'
      }
    }
    if (errors.indexOf('termsandconditions') > -1) {
      this.model.termsandconditions.errorMessage = {
        'text': 'Please accept terms and conditions of use'
      }
    }
  }

  if (register != null) {
    this.model.firstName.value = register.firstName
    this.model.lastName.value = register.lastName
    this.model.organisationName.value = register.organisationName
    this.model.telephoneNumber.value = register.telephoneNumber
    this.model.email.value = register.email
    this.model.addressLine1.value = register.addressLine1
    this.model.addressLine2.value = register.addressLine2
    this.model.town.value = register.town
    this.model.county.value = register.county
    this.model.postcode.value = register.postcode
    this.model.country.value = register.country
  }
}

module.exports = ViewModel
