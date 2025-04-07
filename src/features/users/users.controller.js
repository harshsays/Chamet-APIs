import { applicationError } from "../../error Handler/errorHandling.js";
import { userRepository } from "./users.repository.js";
import bcrypt from "bcrypt"
class userController {

    signUp=async(req,res,next)=>{
        try{
            const {name,email,password}=req.body;
            const user=await userRepository.signUp(name,email,password);
            return res.status(201).json({success:true,message:"User is successfully registered"})
        }catch(err){
            console.log("user controller Erro: "+err.message);
            next(err);
        }
    }

    signIn=async(req,res,next)=>{
        try{

        }catch(err){

        }
    }

}


export {userController}