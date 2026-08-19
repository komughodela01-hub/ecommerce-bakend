//Tumne userValidation (Joi) me jo banaya hai, wo input validation ke liye hai.
const Joi = require("joi");

const registerValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),

  email: Joi.string().email().required(),

  mobile: Joi.string()
    .required()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),

  password: Joi.string().min(6).max(20).required(),
});



//login  mobile  validation----------------------

// const loginValidation = Joi.object({
//   // email: Joi.string().email(),

  //  mobile: Joi.string()

  //   .trim()
  //   .pattern(/^[0-9]{10}$/)
  //   .messages({
  //     "string.empty": "Mobile number is required",
  //     "any.required": "Mobile number is required",
  //     "string.pattern.base": "Mobile number must contain exactly 10 digits",
  //   }),

//     // password: Joi.string().min(6).max(20).required(),
// })
// .xor("email","mobile")
// .messages({
//   "object.xor":"please provide either email or mobile number"
// })
 
//login validation-------------------------------------------------
const loginValidation = Joi.object({
  email: Joi.string().email(),

  //  mobile: Joi.string()

  //   .trim()
  //   .pattern(/^[0-9]{10}$/)
  //   .messages({
  //     "string.empty": "Mobile number is required",
  //     "any.required": "Mobile number is required",
  //     "string.pattern.base": "Mobile number must contain exactly 10 digits",
  //   }),

    password: Joi.string().min(6).max(20).required(),
})
.xor("email","mobile")
.messages({
  "object.xor":"please provide either email or mobile number"
})


//verify validation----------------------
const verifyOTPValidation = Joi.object({
  mobile: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),
  otp: Joi.string().length(6).required()

    
});

//forgot validation-------------------------------
const forgotValidation = Joi.object({
 mobile: Joi.string()

    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),
});



//forgotVerify validation--------------------------------
const forgotVerifyValidation = Joi.object({
  mobile: Joi.string()

    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),
  otp: Joi.string().length(6).required()
});





//reset password valedation-----------------------------------------------
const resetPasswordValidation = Joi.object({
  mobile: Joi.string()
    .trim()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),

    password: Joi.string().min(6).max(20).required(),


  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Confirm password is required",
      "any.required": "Confirm password is required",
      "any.only": "Confirm password must match the password",
    }),
});

//changePassword---------------------------------
const changePasswordValidation = Joi.object({
 mobile: Joi.string()

    .trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.empty": "Mobile number is required",
      "any.required": "Mobile number is required",
      "string.pattern.base": "Mobile number must contain exactly 10 digits",
    }),

  oldPassword: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.empty": "old password is required",
      "any.required": "old password is required",
      "string.min": "old password must be at least 6 characters",
      "string.max": "old password must not exceed 20 characters",
    }),

  newPassword: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      "string.empty": "New password is required",
      "any.required": "New password is required",
      "string.min": "New password must be at least 6 characters",
      "string.max": "New password must not exceed 20 characters",
    }),

  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("newPassword"))
    .messages({
      "string.empty": "Confirm password is required",
      "any.required": "Confirm password is required",
      "any.only": "Confirm password must match the new password",
    }),
});



module.exports = {
  registerValidation,
  loginValidation,
  verifyOTPValidation,
  forgotValidation,
  forgotVerifyValidation,
  resetPasswordValidation,
  changePasswordValidation,
};
