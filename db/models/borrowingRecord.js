module.exports = function (sequelize, DataTypes) {
    var borrowingRecord = sequelize.define('borrowing_records', {
        'userId': {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        'bookId': {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        'borrowDate': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        'returnDate': {
            type: DataTypes.DATE,
            allowNull: true
        },
        'status': {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'borrowed'
        }
    }, {
        timestamps: true,

        updatedAt: 'updated_at',
        createdAt: 'created_at',

        tableName: 'borrowing_records' 
    });

    borrowingRecord.associate = function (models) {
        borrowingRecord.belongsTo(models.users, { foreignKey: 'userId' });
        borrowingRecord.belongsTo(models.books, { foreignKey: 'bookId' });
    };
    // borrowingRecord.sync({alter:true})
    return borrowingRecord;
};
