const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../../connections/db');

class EmailTemplate extends Model {
  static associate(models) {
  }

}

EmailTemplate.init({
  name: {
    type: Sequelize.STRING
  },
  subject: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

}, {
  sequelize,
  modelName: 'email_templates',
  tableName: 'email_templates',
});

module.exports = EmailTemplate;
