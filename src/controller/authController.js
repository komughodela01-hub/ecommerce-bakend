// async aur await JavaScript me asynchronous operations ko handle karne ke liye use hote hain. APIs ke saath ye
//  isliye use kiye jaate hain kyunki API response aane me time lag sakta hai.
// async kya karta hai?
// Jis function ke aage async likhte hain, wo hamesha ek Promise return karta hai.
// await kya karta hai?
// await Promise ke complete hone ka wait karta hai aur result milne ke baad hi next line execute karta hai.





const User = require("../models/User");
const {
  registerValidation,
  loginValidation,
 verifyOTPValidation,
 forgotValidation,
  forgotVerifyValidation,
  resetPasswordValidation,
} = require("../validations/uservalidation");

const {generateotp}=require("../utils/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail=require("../utils/sendMail")



// REGISTER ..
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (name, email, mobile, password)",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters",
      });
    }

    if (mobile.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be 10 digits",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email or Mobile already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
      name,
      email,
      mobile,
      password:hashPassword,
    });

    //email----
    await sendMail(
      email,
      "registration successfully",
      `
      <h2>hello ${name}</h2>
      <p>your acount has been created successfully</p>
      `,
    );

    

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






//login with joi ------------------------------------------------------------------
// exports.register = async (req, res) => {
  // try {
  //   const { error } = registerValidation.validate(req.body);



  //   if (error) {
  //     return res.status(400).json({
  //       success: false,
  //       message: error.details[0].message.replace(/"/g, ""),
  //     });
  //   }

  //   const { name, email, mobile, age, password } = req.body;

//     const existingUser = await User.findOne({
//       $or: [{ email }, { mobile }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email or Mobile already exists",
//       });
//     }

//     const user = await User.create({
//       name,
//       email,
//       mobile,
//       password,
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };














// login---with email and password---------------------------------------------------
exports.login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
        const {email, password} = req.body;

          if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({ email }); //Yaha hum request body ke andar se email aur password nikal kar alag variables bana rahe hain taaki unko easily use kar sake."
       
          if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email "
            });
        }

        // if(password !== user.password){
        //     return res.status(401).json({
        //         success: false,
        //         message: "Invalid password"
        //     });
        // }

        const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid password"
  });
}
            //generate jwt-----------
    const token =jwt.sign(
        {
          id:user._id,
          email:user.email,
          mobile:user.mobile,
          role:user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn:"1h"
        },
    );
            res.status(201).json({
      success: true,
      message: "login successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};








//login 2  login with email && mobile-------

// exports.login = async (req, res) => {
//   try {
//     const { email, mobile, password } = req.body;

//     if ((!email && !mobile) || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email or Mobile and password are required",
//       });
//     }

// const user = await User.findOne({
//   $or: [ {email },{mobile }]
// });

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or mobile",
//       });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Login successfully",
//       data: user,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };













//login with mobile and email with joi---------------------------------------------------------
//Controller me jo bana rahe ho, wo database check ke liye hai.


// exports.login = async (req, res) => {
//   try {
//     const { error } = loginValidation.validate(req.body);

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message.replace(/"/g, ""),
//       });
//     }
//         const {email,mobile, password} = req.body;

//         let user; //hume pata nahi tha user email se milega ya mobile se esliye bnaya

//       if (email ) {
//         user=await User.findOne({email});
//         if(!user){
//         return res.status(400).json({
//                 success: false,
//                 message: "Email invalid"
//             });
//         }
//         }

//           if (mobile ) {
//         user=await User.findOne({mobile});
//         if(!user){
//         return res.status(400).json({
//                 success: false,
//                 message: "mobile imvalid"
//             });
//         }
//         }

//        if (user.password !== password){

//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid password"
//             });
//         }
//             res.status(201).json({
//       success: true,
//       message: "login successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };










//login with otp--------------------------------------------------------------
// exports.login = async (req, res) => {
//   try {
//     const { error } = loginValidation.validate(req.body); //Ye check karega ki request me jo data aaya hai wo sahi hai ya nahi.

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message.replace(/"/g, ""),
//       });
//     }
//     const { mobile } = req.body;

//     let user = await User.findOne({ mobile });
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "mobile invalid",
//       });
//     }

    // let newOtp = generateotp();

    // await User.updateOne(  
    //   { mobile },
    //   {
    //     $set: {
    //       otp: newOtp,
    //     },
    //   },
    // );

   


//     res.status(201).json({
//       success: true,
//       message: "OTP generated successfully",
//       data: newOtp,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// //verifyOTP-----------------------------------------------
// exports.verifyOTP = async (req, res) => {
//   try {
//     const { error } =  verifyOTPValidation.validate(req.body);

//     if (error) {
//       return res.status(400).json({
//         success: false,
//         message: error.details[0].message.replace(/"/g, ""),
//       });
//     }

//     const { mobile, otp } = req.body;

//     const user = await User.findOne({ mobile });

//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mobile",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     user.otp=null
//     await user.save()



//     res.status(200).json({
//       success: true,
//       message: "login successfully",
//       token
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


//forgot----------------------------------------------------
exports.forgot = async (req, res) => {

try {
    const { error } = forgotValidation.validate(req.body); //Ye check karega ki request me jo data aaya hai wo sahi hai ya nahi.

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
    const { mobile } = req.body;

    let user = await User.findOne({ mobile });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "mobile invalid",
      });
    }

    let newOtp = generateotp();

    await User.updateOne(  
      { mobile },
      {
        $set: {
          otp: newOtp,
        },
      },
    );


    res.status(201).json({
      success: true,
      message: "OTP generated successfully",
      data: newOtp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//forgotVerifyOTP--------------------------------------
exports.forgotVerifyOTP = async (req, res) => {
  try {
    const { error } = forgotVerifyValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    const { mobile, otp } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile",
      });
    }

    if (user.otp !== otp) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    user.otp=null
    user.forgotisVerify = true;
    await user.save()

    res.status(200).json({
      success: true,
      message: "verifyOTP successfully",
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//reset password-----------------------
exports.resetPassword = async (req, res) => {
  try {

    const { error } = resetPasswordValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    const { mobile, password } = req.body;

    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid mobile",
      });
    }

    if (!user.forgotisVerify) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP ",
      });
    }

    // user.password = password; 
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;

     user.forgotisVerify = false;
    await user.save();
   

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};