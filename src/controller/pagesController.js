const Page = require("../models/Page");

exports.createPages = async (req, res) => {
  try {
    const { title, slug, content, status } = req.body;

    if (!title || !slug) {
      return res.status(400).json({
        success: false,
        message: "Title and slug are required",
      });
    }

    const existingPage = await Page.findOne({
      $or: [{ title }, { slug }],
    });

    if (existingPage) {
      return res.status(400).json({
        success: false,
        message: "Page already exists",
      });
    }

    const page = await Page.create({
      title,
      slug,
      content,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Page created successfully",
      data: page,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all pages----------------------------------------------------------------------------------
exports.getAllPages = async (req, res) => {
  try {
    const pages = await Page.find();

    return res.status(200).json({
      success: true,
      message: "get-All-Pages successfully",
      data: pages,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get single page-------------------------------------------------------------

exports.getSinglePage=async(req,res)=>{
try{
    const{slug}=req.body;

  if (!slug) {
            return res.status(404).json({
                success: false,
                message: "please enter slug",
            });
        }
        const pages=await Page.findOne({slug});
         if (!pages) {
            return res.status(404).json({
                success: false,
                message: "Invalid slug"
            });
        }
                return res.status(200).json({
            success: true,
            message: "page get successfully",
            data: pages,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//update page-------------------------------------------------------------------
exports.updatePages=async(req,res)=>{
    try{
         
        const{id,title, slug, content, status}=req.body;

        if(!id){
              return res.status(400).json({
                success: false,
                message: "please enter id",
            });

        }
        const updatePages =await Page.findByIdAndUpdate(
            id,{
               title,
               slug,
               content,
                status
            }
        )
        if(!updatePages){
              return res.status(400).json({
                success: false,
                message: "cannot update",
            });
        }
         res.status(200).json({
            success: true,
            message: "page update successfully",
            data: updatePages
        });
        
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
}

//delete pages--------------------------------------------------------------------------------
exports.deletePages = async (req, res) => {
    try {

           const{id}=req.body;

         if (!id) {
            return res.status(404).json({
                success: false,
                message: "please enter id",
            });
        }

        const pages = await Page.findByIdAndDelete(id);

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "invalid id "
            });
        }

        return res.status(200).json({
            success: true,
            message: "Page delete successfully",
            data: pages
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 




