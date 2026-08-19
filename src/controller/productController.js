const Product = require("../models/Product");

//create-product------------------------------------------------------------------------

exports.productCategory = async (req, res) => {
    try {
        let { name, description, price, stock, image, status } = req.body;

        const existingProduct = await Product.findOne({ name });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: "Product already exists",
            });
        }

        if (req.file) {
            image = `uploads/profile/${req.file.filename}`;
        }

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            image,
            status,
        });

        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: product,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//get-All-products--------------------------------------------------------------------

exports.getAllProduct=async(req,res)=>{
try{
 
        // const products=await Product.find();
        const products = await Product.aggregate([
  {
    $lookup: {
      from: "category",     
      localField: "categoryId", 
      foreignField: "_id",      
      as: "category"
    }
  }
]);
       
        return res.status(200).json({
            success: true,
            message: "All product get successfully",
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//get-single-product-------------------------------------------------------------------------------

exports.getSingleProduct=async(req,res)=>{
try{
    const{id}=req.body;

  if (!id) {
            return res.status(404).json({
                success: false,
                message: "please enter id",
            });
        }
        const product=await Product.findById(id);
         if (!product) {
            return res.status(404).json({
                success: false,
                message: "Invalid id"
            });
        }
                return res.status(200).json({
            success: true,
            message: "product get successfully",
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//update product--------------------------------------------------------------------
exports.updateProduct=async(req,res)=>{
    try{
         
        const{id ,name, description, price, stock, image, status}=req.body;

        if(!id){
              return res.status(400).json({
                success: false,
                message: "please enter id",
            });

        }
        const updateProduct =await Product.findByIdAndUpdate(
            id,{
                name,
                description,
                price,
                stock,
                image,
                status
            }
        )
        if(!updateProduct){
              return res.status(400).json({
                success: false,
                message: "cannot update",
            });
        }
         res.status(200).json({
            success: true,
            message: "product update successfully",
            data: Product
        });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}
//delete product--------------------------------------------------------------------------------
exports.deleteProduct = async (req, res) => {
    try {

           const{id}=req.body;

         if (!id) {
            return res.status(404).json({
                success: false,
                message: "please enter id",
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "invalid id "
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product delete successfully",
            data: Product
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 






