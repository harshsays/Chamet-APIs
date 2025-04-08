import { applicationError } from "../../error Handler/errorHandling.js";
import { userSchema } from "./users.schema.js";
import mongoose from "mongoose";

const userModel=mongoose.model("users",userSchema);


class userRepository{
    static signUp=async(name,email,password)=>{
        try{
            const user= new userModel({name,email,password});
            const answer=await user.save();
        }catch(err){
            if (err instanceof mongoose.Error.ValidationError){
                console.log("first");
                throw new applicationError(409, err.message);
            } else if (err.cause.code === 11000) {
                console.log("second");
                throw new applicationError(409, "Email already exists");
            } else {
                console.log("third");
                throw new applicationError(500, err.message);
            }

        }
    }

    static signIn=async()=>{
        try{

        }catch(err){

        }
    }

    static findUserByEmail=async(email)=>{
        try{
            const existence= await userModel.findOne({email:email});
            return existence;
        }catch(err){
            console.log("Error At user Repository: "+err.message);
            throw new Error(err.message);   
        }
    }
}


export {userRepository}