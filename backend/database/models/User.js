const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../connections/db');
const bcrypt = require('bcrypt');

class User extends Model {

  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 255],
    },
    set(value) {
      const hashedPassword = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hashedPassword);
    },
  },
}, {
  sequelize,
  modelName: 'User',
});

module.exports = User;
