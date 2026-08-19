require("dotenv").config();  //env file ko load krta h

const app=require("./app");  //app.js import kr rha h

const port=process.env.PORT || 3000; //env file read krta h

app.listen(port,()=>{
    console.log(`serevr started at http://localhost:${port}`);
     
})