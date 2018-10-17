const Joi = require('joi')

module.exports = Joi.any().valid('recovery', 'disposal').required()
