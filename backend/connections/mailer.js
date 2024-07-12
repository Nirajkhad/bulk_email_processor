const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } = require('../config/mail')

const transporter = nodemailer.createTransport(smtpTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD
  }
}));

module.exports = transporter;