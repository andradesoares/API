const joi = require('joi')

module.exports = {
  userSchema: joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required()
  }),
  userPatchSchema: joi.object().keys({
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string().email()
  }),
  userCarSchema: joi.object().keys({
    make: joi.string().required(),
    model: joi.string().required(),
    year: joi.number().required()
  }),
  carSchema:joi.object().keys({
    sellet: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    make: joi.string().required(),
    model: joi.string().required(),
    year: joi.number().required()
  }),
  carPatchSchema: joi.object().keys({
    make: joi.string(),
    model: joi.string(),
    year: joi.number()
  }),
  idSchema: joi.object().keys({
    param: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
}