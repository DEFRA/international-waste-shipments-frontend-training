function ViewModel (generatedNotificationNumber, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    title: 'Your notification number',
    notificationNumber: 'Here is your notification number:',
    financialGuarantee: '/assets/pdfs/IwsFinancialGuarantee28_09_2018_08_19_39.pdf',
    html: generatedNotificationNumber
  }
}

module.exports = ViewModel
