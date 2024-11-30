const express = require('express');
const router = express.Router();
const { bookSchema } = require('../validations/bookValidation');
const { addBook, updateBook, deleteBook, viewBooks } = require('../src/controller/bookController');
const { validate } = require('./middlewares/middleware');
const { checkToken, roleMiddleware } = require('./middlewares/middleware');

router.post('/add', checkToken, roleMiddleware(['admin']), validate(bookSchema), addBook);
router.put('/update/:id', checkToken, roleMiddleware(['admin']), validate(bookSchema), updateBook);
router.delete('/delete/:id', checkToken, roleMiddleware(['admin']), deleteBook);
router.get('/view', checkToken, roleMiddleware(['librarian', 'member']), viewBooks);

module.exports = router;