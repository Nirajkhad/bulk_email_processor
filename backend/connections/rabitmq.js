const amqp = require('amqplib');
const { QUEUE_CONNECTION } = require('../config/rabitmq');

let channel;

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(QUEUE_CONNECTION);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

const getChannel = () => channel;

const publishToQueue = async (queueName, data) => {
    const channel = getChannel();
    console.log(channel);
    if (channel) {
      await channel.assertQueue(queueName, { durable: true });
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), { persistent: true });
      console.log(`Message sent to ${queueName}:`, data);
    } else {
      console.error(`No channel available to send message to ${queueName}`);
    }
  };

module.exports = { connectRabbitMQ, getChannel, publishToQueue };
