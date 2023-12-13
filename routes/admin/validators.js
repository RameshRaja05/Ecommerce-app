import { check} from "express-validator";
import usersRepo from "../../repositories/users.js";


const requireEmail=check("email")
.trim()
.normalizeEmail()
.isEmail()
.withMessage("Must be a valid email")
.custom(async email=>{
  const existingUser=await usersRepo.getOneBy({email});
  if(existingUser){
    throw new Error("Email already in use");
  }
});

const requirePassword=check("password")
.trim()
.isLength({ min: 8, max: 20 })
.withMessage("Must be between 8 and 20 characters");

const requirePasswordConfirmation=check("password2")
.trim()
.isLength({ min: 8, max: 20 })
.withMessage("Must be between 8 and 20 characters")
.custom((value,{req})=>{
   if(value!==req.body.password){
      throw new Error("Passwords must match");
   }else{
    return true;
   }
})

const requireEmailExists=check("email")
.trim()
.normalizeEmail()
.isEmail()
.withMessage("Must be valid email")
.custom(async email=>{
  const user=await usersRepo.getOneBy({email});
  if(!user){
    throw new Error("Your account doesn't exist check your email")
  }
})

const requirePasswordForUser=check("password")
.trim()
.custom(async (password,{req})=>{
  const user=await usersRepo.getOneBy({email:req.body.email});
  if(!user){
    throw new Error("Invalid Password");
  }
  const isValidPW=await usersRepo.comparePasswords(user.password,password);
  if(!isValidPW){
    throw new Error("Your entered password is incorrect");
  }
})

const requireTitle=check("title")
.trim()
.isLength({min:5,max:40})
.withMessage("Title should be between 5 and 40 characters long");

const requirePrice=check("price")
.trim()
.toInt()
.isInt({min:1})
.withMessage("Price should be greater than or equals to 1")

export {requireEmail,requirePassword,requirePasswordConfirmation,requireEmailExists,requirePasswordForUser,requireTitle,requirePrice};
