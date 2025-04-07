import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{type:String,required:[true,"Please enter the name"]},
    email:{type:String,required:[true,"Please enter the email"],unique:[true,"Email already exists"]},
    password:{type:String,minLength:[10,"Should be atleast 10 characters"],required:[true,"Please enter the password"]}
    
});

export {userSchema}