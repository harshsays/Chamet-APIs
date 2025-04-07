import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoose= async()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.info("Database has been connected successfully  using Mongoose")
    }catch(err){
        console.log(err.message);
        console.info("Problem while connecting to the Mongoose Database")  
    }
}


export {connectToMongoose}