const Joi = require('joi')

module.exports = Joi.any().valid('1', '2').required()
