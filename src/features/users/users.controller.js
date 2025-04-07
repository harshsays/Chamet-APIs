import { applicationError } from "../../error Handler/errorHandling.js";
import { userRepository } from "./users.repository.js";
import bcrypt from "bcrypt"
class userController {

    signUp=async(req,res,next)=>{
        try{
            const {name,email,password}=req.body;
             console.log(name,email,password)
            const hashPassword= bcrypt.hash(password);
            const user=await userRepository.signUp(name,email,hashPassword);
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