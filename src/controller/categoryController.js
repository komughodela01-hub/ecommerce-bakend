const Category = require("../models/Category");


//create-Category-------------------------------------------------------------------------

exports.createCategory = async (req, res) => {
try {

    const { name, description, parentId, status } = req.body;

    let profileImage = "";

    const existingCategory = await Category.findOne({ name });

    if(existingCategory){
        return res.status(400).json({
            success:false,
            message:"Category already exists"
        });
    }


    if(req.file){
        profileImage = `profile/${req.file.filename}`;
    }


    const category = await Category.create({
        name,
        description,
        profileImage,
        parentId,
        status
    });


    return res.status(201).json({
        success:true,
        message:"Category created successfully",
        data:category
    });


}
catch(error){
    

    console.log("CATEGORY ERROR:",error);

    return res.status(500).json({
        success:false,
        message:error.message
    });

}

};
//get-All-category--------------------------------------------------------------------

exports.getAllCategory=async(req,res)=>{
try{
 
        const category=await Category.find();
       
        return res.status(200).json({
            success: true,
            message: "AllCategories get successfully",
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}


//get-single-category-------------------------------------------------------------------------------

exports.getSingleCategory=async(req,res)=>{
try{
    const{id}=req.body;

  if (!id) {
            return res.status(404).json({
                success: false,
                message: "please enter id",
            });
        }
        const category=await Category.findById(id);
         if (!category) {
            return res.status(404).json({
                success: false,
                message: "Invalid id"
            });
        }
                return res.status(200).json({
            success: true,
            message: "Category get successfully",
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}




//update category--------------------------------------------------------------------
exports.updateCategory=async(req,res)=>{
    try{
         
        const{id,name,description,profileImage,parentId,status}=req.body;

        if(!id){
              return res.status(400).json({
                success: false,
                message: "please enter id",
            });

        }
        const updateCategory =await Category.findByIdAndUpdate(
            id,{
                name,
                description,
                profileImage,
                parentId,
                status
            }
        )
        if(!updateCategory){
              return res.status(400).json({
                success: false,
                message: "cannot update",
            });
        }
         res.status(200).json({
            success: true,
            message: "category update successfully",
            data: updateCategory
        });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//delete category----------------------------------------------------------------------

exports.deleteCategory = async (req, res) => {
    try {

           const{id}=req.body;

         if (!id) {
            return res.status(404).json({
                success: false,
                message: "please enter id",
            });
        }

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "invalid id "
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category delete successfully",
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 

