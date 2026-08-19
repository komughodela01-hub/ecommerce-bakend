const express=require("express");
const authRoutes=require("./routes/adminRoutes")
const connectDB=require("./config/db")
const path=require("path")
const cors=require("cors")



const app=express();

connectDB()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use("/image", express.static(path.join(__dirname, "uploads/profile")));
app.use("/admin",authRoutes)


module.exports=app
