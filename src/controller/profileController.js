const User = require("../models/User");
const bcrypt = require("bcrypt");
const {changePasswordValidation,} = require("../validations/uservalidation");


//get profile ----------------------
exports.getProfile = async (req, res) => {
    try {
        const id=req.user.id
        const user=await User.findById(id)

        if (!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profile get successfully",
            data:user
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

//edit profile-----------------------

exports.editProfile = async (req, res) => {
    try {
        const id = req.user.id;

     const user = await User.findById(id).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
 const { name,email,mobile} = req.body;

const existingUser = await User.findOne({
    _id: { $ne : id},                                                //Jis user ka profile update ho raha hai, usko ignore karke baaki users me check karna.
    $or :[ {email: email} ,{mobile: mobile}]
})
if(existingUser){
    return res.status(400).json({
        sucess: false,
        message:"user already exist"
    })
}
        user.name = req.body.name;
        user.email = req.body.email;
        user.mobile = req.body.mobile;


        //image
        if(req.file){
          user.profileImage=`profile/${req.file.filename}`;
        }
  
        await user.save();
    //  user.password = undefined;

        res.status(200).json({
            success: true,
            message: "Profile update successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//change password----------------------------------------------------------
exports.changePassword = async (req, res) => {
  try {

    const { error } =  changePasswordValidation.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }

    const { oldPassword,newPassword,confirmPassword} = req.body;

    if(!oldPassword|| !newPassword || !confirmPassword){
        return res.status(400).json({
            success :false,
            message : "all field required"
        })
    }

    if(newPassword !=confirmPassword){
        return res.status(400).json({
            success :false,
            massage : "newPassword and confirmPassword  match "
        })
    }


    const user = await User.findById(req.user.id)

    if(!user){
        return res.status(400).json({
            success : false ,
            message : "user not found"
        })
    }

    const matchpassword = await bcrypt.compare(oldPassword ,user.password)

    if(!matchpassword){
        return res.status(400).json({
            success : false ,
            message : "old password wrong"
        })
    }

    const hashPassword = await bcrypt.hash(newPassword ,10)

    user.password = hashPassword 

    await user.save();

    res.status(200).json({
        success : false,
        message :"password change successfully ",
        data:user,
    })

}catch(error){
    return res.status(500).json({
    success : false,
    message : error.message
    })
}
}