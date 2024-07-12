'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('email_templates', [
      {
        name: 'Welcome Email',
        subject: 'Welcome to Our Platform!',
        body: 'Dear {{username}}, welcome to our platform. Enjoy your stay!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Promotion Email',
        subject: 'Special Offer',
        body: 'Dear {{username}}, Get 50% off on your next purchase. Use code PROMO50 at checkout',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('email_templates', null, {});
  }
};
