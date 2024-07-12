const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../helpers/responser");
const { registerUser, generateToken, loginUser } = require("../services/authService");
const { getUser, getUserByUsernameOrEmail } = require("../repositories/userRepo");
const { validateOTP } = require("../services/otpService");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(successResponse(errors.array(),422));
    }

    const existingUser = await getUser(req.body.email, req.body.username);
    if (existingUser) {
      return res.status(400).json(errorResponse("User already exists", 400));
    }

    await registerUser(req.body, res);
    return res.status(200).json(successResponse("Verification email has been sent to your email.",200));
  } catch (error) {
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

const generateJwtToken = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(successResponse(errors.array(),422));
    }

    const { username , otp } = req.body;
    const userData = await getUserByUsernameOrEmail(username);
    if (!userData) {
      return res.status(404).json(errorResponse("User does not exists", 400));
    }

    const isVerified = await validateOTP(otp);
    if (!isVerified) {
      return res
        .status(401)
        .json(errorResponse("Verification key is invalid", 404));
    }

    return res.status(200).json(successResponse(await generateToken(username)));
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(successResponse(errors.array(),422));
    }
    const { username, password } = req.body;
    const user = await getUserByUsernameOrEmail(username);
    const isPasswordMatch = await user.comparePassword(password);
    if(!user || !isPasswordMatch ){
      return res.status(404).json(errorResponse("Invalid Credentials", 400));
    }
    await loginUser(user);
    return res.status(200).json(successResponse("Verification email has been sent to your email."));
  } catch (error) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json(errorResponse("Internal server error", error.statusCode));
  }
};

module.exports = { register, generateJwtToken,login };
