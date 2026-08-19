const mongoose =require("mongoose");
const { verify } = require("../controller/authController");
const { boolean, string } = require("joi");

const userSchema=new mongoose.Schema(
    {
        profileImage:{
            type:String,
            default:null
        },
        name:{
            type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true,
        },
       
        mobile:{
             type:String,
            required:true,
            unique:true,
            minlength:10,
            maxlength:10,

        },
        password:{
            type:String,
            required:true,
        
            minlength:6,
            maxlength:100,
        },
        role:{
            type:String,
            default:"user",
            enum:["user","admin"],
        },
        otp:{
            type:String,
            default:null,
            minlength:6,
            maxlength:20,
        },
       forgotisVerify :{
            type: Boolean,
            default: false
        }
        
    },
    {
        timestamps:true,
    },
);

module.exports=mongoose.model("User",userSchema);