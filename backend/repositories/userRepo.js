const { Op } = require("sequelize");
const { User } = require("../database/models");

const getUser = async (email, username) => {
  try {
    return await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });
  } catch (error) {
    console.error(`Error in getUser: ${error.message}`);
    throw new Error("Could not fetch user. Please try again.");
  }
};

const getUserByUsernameOrEmail = async (username) => {
  console.log(username);
    try {
        return await User.findOne({
          where: {
            [Op.or]: [{ email: username }, { username: username }],
          },
        });
      } catch (error) {
        console.error(`Error in getUser: ${error.message}`);
        throw new Error("Could not fetch user. Please try again.");
      }
}

module.exports = { getUser, getUserByUsernameOrEmail };
