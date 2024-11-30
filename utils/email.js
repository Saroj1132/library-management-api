const nodemailer = require('nodemailer');

class EMAILS {
    async sendemail(payload) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your Email',
                pass: 'your Password',
            },
        });

        const mailOptions = {
            from: 'your Email',
            to: payload.to,
            subject: payload.subject,
            text: payload.body,
            html: payload.html
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    }
}

const EMAIL = new EMAILS();

module.exports = EMAIL;