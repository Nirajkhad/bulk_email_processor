const { Sequelize } = require('sequelize');
const { development } = require('../config/database');

const sequelize = new Sequelize(
  development.database,
  development.username,
  development.password,
  {
    host: development.host,
    port: development.port,
    dialect: development.dialect,
  }
);

module.exports = sequelize;
