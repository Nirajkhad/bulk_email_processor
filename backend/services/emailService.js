const transporter = require("../connections/mailer");
const { SENDER_EMAIL } = require("../config/mail");
const { getEmailsFromCSV } = require("../helpers/fileHelper");
const { publishToQueue } = require("../connections/rabitmq");
const { getSocketInstance } = require("../connections/socket");

const sendEmail = async (data) => {
  try {
    const io = getSocketInstance();

    for (const element of data) {
      console.log(element)
      await transporter.sendMail({
        from: SENDER_EMAIL,
        to: element.email,
        subject: element.subject,
        text: element.text,
        html: element.html,
      });
      
      
      const logDetails = {
        recipient: element.email,
        status: 'Sent',
        timestamp: new Date().toISOString(),
      };

      io.emit('emailSentLog', logDetails);
      console.log(`Email sent to ${element.email}`);
    }
  } catch (error) {
    console.error(`Failed to send email`,error);
    throw new Error("Could not send password reset email. Please try again.");
  }
};

const sendBulkEmail = async (body) => {
  try {
      const {file_name,email_name,email_subject,email_body} = body;
      const emails = await getEmailsFromCSV(file_name);
      console.log("Email",emails);
      const payload = [];
      for(const email of emails){
        payload.push(
          {
            email: email,
            subject: email_subject,
            text: email_name,
            html: `<p>${email_body}</p>`,
          
        }) ;
      }
      await publishToQueue("emailQueue", payload);

  } catch (error) {
    throw error;
  }
}

module.exports = { sendEmail, sendBulkEmail};
