import { applicationError } from "../../error Handler/errorHandling.js";
import { userSchema } from "./users.schema.js";
import mongoose from "mongoose";

const userModel=mongoose.model("users",userSchema);


class userRepository{
    static signUp=async(name,email,password)=>{
        try{
            const user= await new userModel({name,email,password});
            const answer=await user.save();
        }catch(err){
            if(err instanceof mongoose.Error.ValidationError){
                console.info(err.message);
                throw new applicationError(400,err.message)
            }else if(err.code === 11000){
                console.log("Duplicate Key error: "+err.message);
                throw new applicationError(409,"Email already exists");
            }else{
                console.log(err.message);
                throw new applicationError(500,"Internal server error")
            }

        }
    }

    static signIn=async()=>{
        try{

        }catch(err){

        }
    }
}


export {userRepository}