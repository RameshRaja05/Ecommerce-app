import express from "express";
import cookieSession from "cookie-session";
import {fileURLToPath} from "url";
import path,{dirname} from "path";

import authRouter from "./routes/admin/auth.js";
import adminProductRouter from "./routes/admin/products.js";
import productRouter from "./routes/products.js";
import cartRouter from "./routes/carts.js";


const PORT=3000;
const app=express();
//parsing a body
app.use(express.urlencoded({extended:true}));
app.use(cookieSession({
    keys:["sdfb4385b6smd#@"]
}))
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname,"/public")))

app.use("/",authRouter);
app.use("/",adminProductRouter);
app.use(productRouter);
app.use(cartRouter);

app.listen(PORT,()=>{
    console.log(`App listening on ${PORT}`);
})


//todo custom body parsing middleware
// const parsingMiddleWare=(req,_res,next)=>{
//     if(req.method==="POST"){
//         req.on("data",(data)=>{
//             const parsed=data.toString("utf-8").split("&");
//             const formData={};
//             for(let pairs of parsed){
//                 const [key,value]=pairs.split("=");
//                 formData[key]=value
//             }
//             req.body=formData;
//             next();
//         });
//     }else{
//        next();
//     }
// }
// app.use(parsingMiddleWare);