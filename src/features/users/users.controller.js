import { applicationError } from "../../error Handler/errorHandling.js";
import { userRepository } from "./users.repository.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config()
class userController {

    signUp=async(req,res,next)=>{
        try{
            const {name,email,password}=req.body;
            const hashPassword= await bcrypt.hash(password,10);
            const user=await userRepository.signUp(name,email,hashPassword);
            return res.status(201).json({success:true,message:"User is successfully registered"})
        }catch(err){
            console.log("user controller Erro: "+err.message);
            next(err);
        }
    }

    signIn=async(req,res,next)=>{
        try{
            const {email,password}=req.body;
            const existence= await userRepository.findUserByEmail(email);
            if(existence==null){
                return res.status(400).json({success:false,message:"Email does'nt exist"})
            }
            const passwordExistence=await bcrypt.compare(password,existence.password);
            if(passwordExistence==false){
                return res.status(400).json({success:false,message:"Password is wrong"})
            }

            const token=jwt.sign({email:existence.email},process.env.JWT_TOKEN,{expiresIn:"1d"})

            res.cookie("token", token, {
                httpOnly: true, // Cannot be accessed via JS
                secure: true,   // Only over HTTPS
                sameSite: "strict", // Helps prevent CSRF
            });

            return res.status(200).json({ success: true, message: "User signed in successfully" }); // ✅ This was missing
            

        }catch(err){
            console.log("user cntroller Error: "+err.message);
            next(err)
        }
    }

}


export {userController}