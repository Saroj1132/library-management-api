module.exports = function (sequelize, DataTypes) {
    var books = sequelize.define('books', {
        'id': {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        'title': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'author': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'isbn': {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        'publishedYear': {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        'availableCopies': {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: true,

        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updated_at',
        createdAt: 'created_at',

        tableName: 'books'
    });


    // books.sync({alter:true})
    return books;
};
