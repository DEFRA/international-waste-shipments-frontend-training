const Joi = require('joi')

module.exports = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  organisationName: Joi.string().required(),
  telephoneNumber: Joi.number(),
  email: Joi.string().email(),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string(),
  town: Joi.string().required(),
  county: Joi.string(),
  postCode: Joi.string().regex(/"^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})"/),
  password: Joi.string().regex(/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d]{8,}$"/).min(8).required(),
  confirmPassword: Joi.string(), // Needs to be password
  termsandconditions: Joi.bool().allow('termsandconditions')
}
