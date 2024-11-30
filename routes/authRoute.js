const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema } = require('../validations/authValidation');
const { register, login } = require('../src/controller/authController');
const { validate } = require('./middlewares/middleware');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

module.exports= router;