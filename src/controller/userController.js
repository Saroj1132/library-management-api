const db = require('../../db/models');
const responsehandler = require("../../config/responseTemplates");
const { hashPassword } = require('../../utils/auth');
const emailService = require('../../utils/email');

exports.createUser = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { name, email, phone, role } = req.body;
    try {
        const existingUser = await db.users.findOne({ where: { email } });
        if (existingUser) {
            res.end(JSON.stringify(responsehandler(1, 400, 'Email already exists')));
            return;
        }
        const password = `${name}_${email}_${phone}`;
        const hashedPassword = hashPassword(password);

         await db.users.create({ name, email, phone, password: hashedPassword, role, isConfirmed: true });

        res.end(JSON.stringify(responsehandler(1, 200, 'User add successfully')));
        return;
    } catch (err) {
        console.log(err)
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', err)));
        return false;
    }
};

exports.updateUser = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { userId, name, email, phone, role } = req.body;
    try {
        const user = await db.users.findByPk(userId);
        if (!user) {
            res.end(JSON.stringify(responsehandler(1, 404, 'user not found')));
            return;
        }
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role) user.role = role;

        await user.save();
        res.end(JSON.stringify(responsehandler(1, 200, 'User updated successfully')));
        return;
    } catch (err) {
        console.log(err)
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', err)));
        return false;
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await db.users.findByPk(userId);
        console.log(user)
        if (!user) {
            return res.end(JSON.stringify(responsehandler(1, 404, 'User not found')));
        }

        await user.destroy();

        res.end(JSON.stringify(responsehandler(1, 200, 'User deleted successfully')));
    } catch (error) {
        res.end(JSON.stringify(responsehandler(0, 500, 'Failed to delete user', error.message)));
    }
};