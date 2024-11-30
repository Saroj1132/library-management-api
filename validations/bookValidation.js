const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    publishedYear: Joi.number().integer().required(),
    availableCopies: Joi.number().integer().min(0).required(),
});


module.exports = { bookSchema };
