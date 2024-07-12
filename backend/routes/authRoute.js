const express = require("express");
const {
  userRegistrationRules,
  otpValidationRules,
  userLoginRules
} = require("../validators/userValidation");
const { register, generateJwtToken, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", userRegistrationRules, register);
router.post("/generate/token", otpValidationRules, generateJwtToken);
router.post("/login", userLoginRules, login);



module.exports = router;
