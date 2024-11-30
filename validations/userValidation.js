const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  role: Joi.string().valid('admin', 'librarian', 'member').default('member'),
});


const updateUserSchema = Joi.object({
  userId : Joi.number().required(),
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  role: Joi.string().valid('admin', 'librarian', 'member').default('member'),
});


module.exports = { createUserSchema, updateUserSchema };