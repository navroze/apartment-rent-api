const Joi = require('@hapi/joi');

const apartmentSchema = Joi.object().keys({
  apartment_id: Joi.string().required(),
  zip_code: Joi.string().required(),
  apartment_type: Joi.string().required(),
  apartment_size: Joi.number().integer().required().min(1),
  rent: Joi.number().integer().required().min(1),
  deleted: Joi.boolean().required()
});

module.exports.apartmentSchema = apartmentSchema;
