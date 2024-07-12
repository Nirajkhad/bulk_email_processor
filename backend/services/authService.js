// services/authService.js
const { publishToQueue } = require("../connections/rabitmq");
const { User } = require("../database/models");
const { createJwtToken } = require("../helpers/passwordHelper");
const { generateOTP } = require("./otpService");

const registerUser = async (body) => {
  try {
    const { username, email, password } = body;
    const newUser = await User.create({
      username,
      email,
      password, 
    });
    const otp =  generateOTP();
    const emailData = [{
      email: newUser.email,
      subject: "Authentication Code",
      text: "Use this verification code to authenticate your account.",
      html: `<p>Dear User,</p><p>Your verification code is: <strong>${otp}</strong></p><p>Thank you.</p>`,
    }];
    await publishToQueue("emailQueue", emailData);
  } catch (error) {
    throw error;
  }
};

const loginUser = async(user) => {
  try {
    const otp =  generateOTP();
    const emailData = [{
      email: user.email,
      subject: "Authentication Code",
      text: "Use this verification code to authenticate your account.",
      html: `<p>Dear User,</p><p>Your verification code is: <strong>${otp}</strong></p><p>Thank you.</p>`,
    }];
    await publishToQueue("emailQueue", emailData);
  } catch (error) {
    throw error;
  }
}

const generateToken = (username) => {
  try {
    return createJwtToken(username);
  } catch (error) {
    throw error;
  }
} 

module.exports = { registerUser, generateToken,loginUser };
