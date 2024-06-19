const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const sendEmail = async (to, subject, template, data) => {
  try{
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const templatePath = path.join(__dirname, `../Views/${template}.hbs`);
    const source = fs.readFileSync(templatePath, 'utf-8').toString();
    const templateEmail = handlebars.compile(source);

    const html = templateEmail(data);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: subject,
      html: html,
    }

    await transporter.sendMail(mailOptions);

  }catch(err){
    console.log(err);
    throw err;
  }
}

module.exports = sendEmail;

