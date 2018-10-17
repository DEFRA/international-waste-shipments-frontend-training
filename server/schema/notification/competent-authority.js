const Joi = require('joi')

module.exports = Joi.any().valid('ea', 'sepa', 'niea', 'nrw').required()
