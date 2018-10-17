function ViewModel () {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    title: 'Your homepage',
    question: 'Would you like to start a notification?',
    wasteLink: 'https://www.gov.uk/guidance/importing-and-exporting-waste'
  }
}

module.exports = ViewModel
