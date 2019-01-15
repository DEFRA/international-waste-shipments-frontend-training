function ViewModel (credentials, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    title: 'Sign in to your account',
    email: {
      label: {
        text: 'Email address'
      },
      classes: 'govuk-!-width-one-half',
      id: 'email',
      name: 'email'
    },
    password: {
      label: {
        text: 'Password'
      },
      classes: 'govuk-!-width-one-half',
      id: 'password',
      name: 'password'
    }
  }
  // If error is passed to model then this error property is added to the model and therefore radio macro
  this.hasError = !!error
  if (this.hasError === true) {
    this.model.errorMessage = {
      titleText: 'You have 1 error on this page',
      errorList: [
        {
          text: 'The email address or password is incorrect. Please make sure you enter the correct login details',
          href: '#email'
        }
      ]
    }
  }
}

module.exports = ViewModel
