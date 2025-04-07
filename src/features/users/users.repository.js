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
            if(err instanceof mongoose.Error.ValidationError){
                console.info(err.message);
                throw new applicationError(409,err.message)
            }else{
                console.log(err.message);
                throw new applicationError(500,err.message)
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