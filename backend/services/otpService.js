const { authenticator } = require("otplib");
const OTP_SECRET = process.env.OTP_SECRET;

authenticator.options = {
  step: 60,
  window: 1
};

const generateOTP = () => {
  const otp = authenticator.generate(OTP_SECRET);
  return otp;
};

const validateOTP = (otp) => {
  return authenticator.verify({ token:otp, secret: OTP_SECRET });
}

module.exports = {
  generateOTP,
  validateOTP
};
