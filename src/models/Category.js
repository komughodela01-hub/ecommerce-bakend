const mongoose =require("mongoose");
// const { boolean, string } = require("joi");

const categorySchema=new mongoose.Schema(
    {
       name:{
            type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:50,
        },  

        description: {
            type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 500,
        },

         profileImage:{
            type:String,
            default:null
        },

        parentId: {
             type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
        },

        status: {
            type: String,
        enum: ["Y", "N"],
        default: "Y",
        },
        
    },
     {
        timestamps:true,
    },

)




module.exports=mongoose.model("Category",categorySchema);