const nodemailer = require('nodemailer');
require('dotenv').config();
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

module.exports = transporter;