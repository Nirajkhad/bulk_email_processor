const { getChannel } = require('../connections/rabitmq');
const { sendEmail } = require('./emailService');

const consumeEmailQueue = async () => {
  const channel = getChannel();
  if (channel) {
    channel.assertQueue('emailQueue', { durable: true });
    channel.consume('emailQueue', async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());
        try {
          await sendEmail(data);
        } catch (error) {
          console.error(`Failed to send email to ${data.email}: ${error.message}`);
        }
      }
    });
  }
};

module.exports = { consumeEmailQueue };
