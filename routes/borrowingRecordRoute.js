const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, listBorrowingReturningRecords } = require('../src/controller/borrowingRecordController');
const { checkToken, roleMiddleware } = require('./middlewares/middleware');

router.post('/borrow', checkToken, roleMiddleware(['member']), borrowBook);
router.post('/return', checkToken, roleMiddleware(['member']), returnBook);
router.post('/record', checkToken, roleMiddleware(['librarian']), listBorrowingReturningRecords);

module.exports = router;