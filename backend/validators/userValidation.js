const { body } = require("express-validator");

const userRegistrationRules = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address"),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
    .withMessage('Password must contain at least one number and one special character'),
  
  body("username")
    .notEmpty()
    .withMessage("Username is required")
];

const userLoginRules = [
  body("username")
    .notEmpty()
    .withMessage("Username is required"),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/)
    .withMessage('Password must contain at least one number and one special character'),
  
];


const otpValidationRules = [
  body("username")
    .notEmpty()
    .withMessage("User is required"),
    
  body("otp")
    .notEmpty()
    .withMessage("Otp is required")
];



module.exports = { userRegistrationRules, otpValidationRules, userLoginRules };
