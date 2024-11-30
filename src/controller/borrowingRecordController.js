const db = require('../../db/models');
const responsehandler = require("../../config/responseTemplates");

exports.borrowBook = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { bookId } = req.body;
    const userId = req.decodedJWT?.id;

    try {
        const book = await db.books.findByPk(bookId);
        if (!book) {
            res.end(JSON.stringify(responsehandler(1, 404, 'Book not found')));
            return;
        }

        if (book.availableCopies <= 0) {
            res.end(JSON.stringify(responsehandler(1, 400, 'No copies available to borrow')));
            return;
        }

        const record = await db.borrowing_records.create({
            userId,
            bookId,
            status: 'borrowed',
        });

        await book.decrement('availableCopies');

        res.end(JSON.stringify(responsehandler(1, 201, 'Book borrowed successfully', record)));
        return;
    } catch (error) {
        console.log(error);
        res.end(JSON.stringify(responsehandler(0, 500, 'Failed to borrow book', error.message)));
        return;
    }
};

exports.returnBook = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { bookId } = req.body;
    const userId = req.decodedJWT?.id;

    try {
        const record = await db.borrowing_records.findOne({
            where: { userId, bookId, status: 'borrowed' },
        });

        if (!record) {
            res.end(JSON.stringify(responsehandler(1, 404, 'Borrowing record not found')));
            return;
        }

        await record.update({ status: 'returned', returnDate: new Date() });

        const book = await db.books.findByPk(bookId);
        await book.increment('availableCopies');

        res.end(JSON.stringify(responsehandler(1, 200, 'Book returned successfully')));
        return;
    } catch (error) {
        console.log(error);
        res.end(JSON.stringify(responsehandler(0, 500, 'Failed to return book', error.message)));
        return;
    }
};

exports.listBorrowingReturningRecords = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { bookId, userId } = req.body;
  
    try {
      if (!bookId || !userId) {
        return res.end(JSON.stringify(responsehandler(1, 400, 'bookId and userId are required')));
      }
  
      const book = await db.books.findByPk(bookId);
      if (!book) {
        return res.end(JSON.stringify(responsehandler(1, 404, 'Book not found')));
      }
  
      const user = await db.users.findByPk(userId);
      if (!user) {
        return res.end(JSON.stringify(responsehandler(1, 404, 'User not found')));
      }
  
      const records = await db.borrowing_records.findAll({
        where: {
          bookId,
          userId,
        },
        include: [
          {
            model: db.books,
            attributes: ['title', 'author'],
          },
          {
            model: db.users,
            attributes: ['name', 'email'],
          },
        ],
      });
  
      if (records.length === 0) {
        return res.end(JSON.stringify(responsehandler(1, 404, 'No borrowing or returning records found')));
      }
  
      res.end(JSON.stringify(responsehandler(1, 200, 'Records found', records)));
      return;
    } catch (error) {
      console.log(error);
      res.end(JSON.stringify(responsehandler(0, 500, 'Failed to fetch borrowing/returning records', error.message)));
      return;
    }
  };

