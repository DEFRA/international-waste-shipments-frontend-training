const Joi = require('joi')

module.exports = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  organisationName: Joi.string().required(),
  telephoneNumber: Joi.string().regex(/^[0-9+\\(\\)#\\.\\s\\/ext-]+$/),
  email: Joi.string().email(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string(),
  town: Joi.string().required(),
  county: Joi.string(),
  country: Joi.string(),
  postcode: Joi.when('country', { is: Joi.string().regex(/^05f9f099-9d69-4a35-9daa-b1858933961e$/), then: Joi.string().regex(/^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/).required() }),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.any().valid(Joi.ref('password')),
  termsandconditions: Joi.string().required()
}
