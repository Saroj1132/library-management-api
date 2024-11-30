const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\d{10}$/).required(),
  role: Joi.string().valid('admin', 'librarian', 'member').default('member'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

module.exports = { registerSchema, loginSchema };