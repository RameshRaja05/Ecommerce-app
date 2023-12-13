import {validationResult} from "express-validator";
import productsRepo from "../../repositories/products.js";

//return the new function that is express middleware that handles the error
export const handleError=(templateFunc,dataCb)=>{
    return async(req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            //if dataCb provided we can that function to get data amd append to the templatefunc it's specially created for data populated form
            let data={};
            if(dataCb){
                data=await dataCb(req);
            }

            return res.send(templateFunc({errors,...data}));
        }
        next();
    }
}

//auth middleware
export const requireAuth=(req,res,next)=>{
    if(!req.session.userID){
        return res.redirect("/login");
    }
    next();
}

export const isAuthor=async(req,res,next)=>{
    const {userID}=req.session;
    const {Id}=req.params;
    const product=await productsRepo.getOne(Id);
    if(product.author!==userID){
      return res.redirect("/admin/products");
    }
    next();
}