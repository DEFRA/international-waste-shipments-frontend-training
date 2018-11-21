function ViewModel () {
  this.title = 'Who is the exporter - notifier?'

  this.partial = require('../../../content/sidebar.js')

  this.model =
  {
    title: 'Who is the exporter - notifier?',
    sole: {
      orgName: {
        label: {
          text: 'Organisation Name'
        },
        hint: {
          text: 'For example, ‘Organisation Name Limited’. For "trading as" names, record it as ‘Organisation Name Limited T/A Name of Organisation’'
        },
        classes: 'govuk-input--width-10',
        id: 'orgName',
        name: 'orgName'
      },
      regNumber:
      {
        id: 'radio',
        name: 'radio',
        type: 'email',
        classes: 'govuk-!-width-one-third',
        label: {
          text: 'Registration Number'
        },
        hint: {
          text: "If you're acting on behalf of the waste generator - producer, this will be your waste broker licence number"
        },
        addRegNumber:
        {
          id: 'radio',
          name: 'radio',
          type: 'email',
          classes: 'govuk-!-width-one-third',
          label: {
            text: 'Additional registration number (optional)'
          }
        }
      }
    },
    partner: {
      regNumber:
      {
        id: 'radio',
        name: 'radio',
        type: 'email',
        classes: 'govuk-!-width-one-third',
        label: {
          text: 'Registration Number'
        },
        hint: {
          text: "If you're acting on behalf of the waste generator - producer, this will be your waste broker licence number"
        },
        addRegNumber:
        {
          id: 'radio',
          name: 'radio',
          type: 'email',
          classes: 'govuk-!-width-one-third',
          label: {
            text: 'Additional registration number (optional)'
          }
        }
      }
    },
    limitedCompany: {
      regNumber:
      {
        id: 'radio',
        name: 'radio',
        type: 'email',
        classes: 'govuk-!-width-one-third',
        label: {
          text: 'Registration Number'
        },
        hint: {
          text: 'This should be your Companies House number'
        },
        addRegNumber:
        {
          id: 'radio',
          name: 'radio',
          type: 'email',
          classes: 'govuk-!-width-one-third',
          label: {
            text: 'Additional registration number (optional)'
          },
          hint: {
            text: "If you're acting on behalf of the waste generator - producer, this will be your waste broker licence number"
          }
        }
      },
      details:
      {
        summaryText: 'Where can I find my Companies House number?',
        html: `Your Companies House number is on your organisation's certificate of incorporation. You can also get the number from your organisation's accountant or accounts department, or <a href="https://beta.companieshouse.gov.uk/" target="_blank" rel="external">search the Companies House online services</a>`
      }

    },
    other: {
      regNumber:
      {
        id: 'radio',
        name: 'radio',
        type: 'email',
        classes: 'govuk-!-width-one-third',
        label: {
          text: 'Registration Number'
        },
        hint: {
          text: "If you're acting on behalf of the waste generator - producer, this will be your waste broker licence number"
        },
        addRegNumber:
        {
          id: 'radio',
          name: 'radio',
          type: 'email',
          classes: 'govuk-!-width-one-third',
          label: {
            text: 'Additional registration number (optional)'
          }
        },
        orgType:
        {
          id: 'radio',
          name: 'radio',
          type: 'email',
          classes: 'govuk-!-width-one-third',
          label: {
            text: 'Organisation type'
          }
        }
      }
    }
  }
}

module.exports = ViewModel
