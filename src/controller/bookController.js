const db = require('../../db/models');
const responsehandler = require("../../config/responseTemplates");

exports.addBook = async (req, res) => {
    try {
        const book = await db.books.create(req.body);
        res.end(JSON.stringify(responsehandler(1, 201, 'books add successfully')));
        return;
    }
    catch (error) {
        console.log(error)
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', error)));
        return false;
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await db.books.findByPk(id);
        if (!book) {
            res.end(JSON.stringify(responsehandler(1, 404, 'book not found')));
            return;
        }

        await book.update(req.body);
        res.end(JSON.stringify(responsehandler(1, 200, 'Book updated successfully', book)));
        return;
    } catch (error) {
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', error)));
        return false;
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await db.books.findByPk(id);
        if (!book) {
            res.end(JSON.stringify(responsehandler(1, 404, 'book not found')));
            return;
        }
        await book.destroy();
        res.end(JSON.stringify(responsehandler(1, 200, 'Book deleted successfully')));
        return;
    } catch (error) {
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', error)));
        return false;
    }
};

exports.viewBooks = async (req, res) => {
    try {
        const books = await db.books.findAll();
        if (books.length > 0) {

            res.end(JSON.stringify(responsehandler(1, 200, 'success', books)));
            return;
        }
        res.end(JSON.stringify(responsehandler(1, 404, 'book not found')));
        return;
    } catch (error) {
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', error)));
        return false;
    }
};