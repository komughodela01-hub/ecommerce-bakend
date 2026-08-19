const mongoose =require("mongoose");


const productSchema=new mongoose.Schema(
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

        price: {
            type: Number,
        required: true,
        min: 0
        },

         stock: {
            type: Number,
        required: true,
        min: 0
        },

         image:{
            type:String,
            default:null
        },

        categoryId: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Category"
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

module.exports=mongoose.model("Product",productSchema);