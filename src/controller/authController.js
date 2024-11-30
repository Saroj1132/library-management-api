const db = require('../../db/models');
const responsehandler = require("../../config/responseTemplates");
const { hashPassword, verifyPassword, generateToken } = require('../../utils/auth');
const emailService = require('../../utils/email');

exports.register = async (req, res) => {
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

        const user = await db.users.create({ name, email, phone, password: hashedPassword, role });

        const emailPayload = {
            subject: "Welcome to Our Platform - Account Confirmation Required",
            html: `
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <p style="font-weight: bold; margin-bottom: 10px;">Dear ${name},</p>
                    <p style="margin-bottom: 10px;">Thank you for registering on our platform. Below are your account details:</p>
                    <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
                    <p style="margin-bottom: 10px;"><strong>Temporary Password:</strong> ${password}</p>
                    <p style="margin-bottom: 10px;">Your account is currently pending confirmation by an administrator. You will be notified once your account is approved and activated.</p>
                    <p style="font-style: italic; margin-bottom: 10px;">Thank you for choosing us!</p>
                </div>
                <div style="margin-top: 20px; font-size: 14px; color: #777;">
                    <p>Best Regards,<br/><span style="font-weight: bold;">[Your Company Name]</span></p>
                </div>
            </body>
            `,
            to: [email],
        };
        emailService.sendemail(emailPayload);
        res.end(JSON.stringify(responsehandler(1, 200, 'User registered successfully. Await admin confirmation.')));
        return;
    } catch (err) {
        console.log(err)
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', err)));
        return false;
    }
};

exports.login = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { email, password } = req.body;
    try {
        const user = await db.users.findOne({ where: { email } });
        if (!user) {
            res.end(JSON.stringify(responsehandler(1, 404, 'User not found')));
            return;
        };

        const isValidPassword = verifyPassword(password, user.password);
        if (!isValidPassword) {
            res.end(JSON.stringify(responsehandler(1, 404, 'Invalid credentials')));
            return;
        }

        if (!user.isConfirmed) {
            res.end(JSON.stringify(responsehandler(1, 404, 'User not confirmed by admin')));
            return;
        };

        const token = generateToken({ id: user.id, role: user.role });

        res.end(JSON.stringify(responsehandler(1, 200, 'success', token)));
        return;
    } catch (err) {
        console.log(err)
        res.end(JSON.stringify(responsehandler(0, 500, 'fail', err)));
        return false;
    }
};