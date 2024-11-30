module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define('users', {
        'id': {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        'name': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'email': {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        'phone': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'password': {
            type: DataTypes.STRING,
            allowNull: true
        },
        'role': {
            type: DataTypes.ENUM('admin', 'librarian', 'member'),
            allowNull: true
        },
        'isConfirmed': {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: true,

        // I want updatedAt to actually be called updateTimestamp
        updatedAt: 'updated_at',
        createdAt: 'created_at',

        tableName: 'users'
    });


    // users.sync({alter:true})
    return users;
};
