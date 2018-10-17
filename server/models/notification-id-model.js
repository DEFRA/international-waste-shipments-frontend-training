function ViewModel () {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    html: '<h1>GB 0001 006421</h1>',
    financialGuarantee: '/assets/pdfs/IwsFinancialGuarantee28_09_2018_08_19_43.pdf',
    title: 'Your notification number',
    notificationNumber: 'Here is your notification number:'
  }
}

module.exports = ViewModel
