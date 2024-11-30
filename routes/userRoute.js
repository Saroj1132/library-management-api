const express = require('express');
const router = express.Router();
const { validate } = require('./middlewares/middleware');
const { checkToken, roleMiddleware } = require('./middlewares/middleware');
const { createUserSchema, updateUserSchema } = require('../validations/userValidation');
const { createUser, updateUser, deleteUser } = require('../src/controller/userController');

router.post('/addusers', checkToken, roleMiddleware(['admin']), validate(createUserSchema), createUser);
router.put('/updateUser', checkToken, roleMiddleware(['admin']), validate(updateUserSchema), updateUser);
router.delete('/deleteUser/:userId', checkToken, roleMiddleware(['admin']), deleteUser);

module.exports = router;