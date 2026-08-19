const express=require("express");

const router=express.Router();

const authController=require("../controller/authController");
const profileController = require("../controller/profileController");
const categoryController=require("../controller/categoryController");
const productController=require("../controller/productController");
const pagesController=require("../controller/pagesController");



const { authGuard } = require("../middleware/authMiddleware");
const createUploader = require("../middleware/uploadMiddleware");

//auth routes---------------------------------------------------------------
router.post("/auth/register",authController.register);
router.post("/auth/login",authController.login);
// router.post("/auth/verifyOTP", authController.verifyOTP);
router.post("/auth/forgot", authController.forgot);
router.post("/auth/forgotVerifyOTP", authController.forgotVerifyOTP);
router.post("/auth/resetPassword", authController.resetPassword);

// profile routes------------------------------------------------------------ 

router.get("/user/getProfile", authGuard, profileController.getProfile);

router.post("/user/editProfile",authGuard,
    createUploader("profile").single("profileImage") , profileController.editProfile);

router.post("/user/changePassword", authGuard, profileController.changePassword);

//category routes------------------------------------------------------
router.post("/category/createCategory",authGuard,
    createUploader("profile").single("profileImage") ,categoryController.createCategory);

    router.get("/category/getAllCategory", authGuard,categoryController.getAllCategory);
    router.get("/category/getSingleCategory", authGuard,categoryController.getSingleCategory);
        router.post("/category/updateCategory", authGuard,categoryController.updateCategory);

     router.post("/category/deleteCategory", authGuard,categoryController.deleteCategory);


     //product routes------------------------------------------------------
     router.post("/product/createProduct",authGuard,
    createUploader("profile").single("image") ,productController.productCategory);

    router.get("/product/getAllProduct", authGuard,productController.getAllProduct);

    router.get("/product/getSingleProduct", authGuard,productController.getSingleProduct);

    router.post("/product/updateProduct", authGuard,productController.updateProduct);

     router.post("/product/deleteProduct", authGuard,productController.deleteProduct);

//pages routes----------------------------------------------------------------------------------
    router.post("/Page/createPages", authGuard,pagesController.createPages);

        router.get("/Page/getAllPages", authGuard,pagesController.getAllPages);
        router.get("/Page/getSinglePage", authGuard,pagesController.getSinglePage);
                router.post("/Page/updatePages", authGuard,pagesController.updatePages);
                router.post("/Page/deletePages", authGuard,pagesController.deletePages);










                                      
module.exports=router