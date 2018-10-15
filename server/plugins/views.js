const path = require('path')
const nunjucks = require('nunjucks')
const config = require('../config')
const pkg = require('../../package.json')
const analyticsAccount = config.analyticsAccount

module.exports = {
  plugin: require('vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          // Adding new filter to the environment so it can be used in the view with nunjucks
          options.environment.addFilter('jsonParse', function (str) {
            return JSON.parse(str)
          })
          const template = nunjucks.compile(src, options.environment)

          return (context) => {
            return template.render(context)
          }
        },
        prepare: (options, next) => {
          options.compileOptions.environment = nunjucks.configure([
            path.join(options.relativeTo || process.cwd(), options.path),
            'node_modules/govuk-frontend/',
            'node_modules/govuk-frontend/components/'
          ], {
            autoescape: true,
            watch: false
          })

          return next()
        }
      }
    },
    path: '../views',
    relativeTo: __dirname,
    isCached: !config.isDev,
    context: {
      appVersion: pkg.version,
      assetPath: '/assets',
      serviceName: 'International Waste Shipments - Training',
      pageTitle: 'International Waste Shipments - Training - GOV.UK',
      analyticsAccount: analyticsAccount
    }
  }
}
