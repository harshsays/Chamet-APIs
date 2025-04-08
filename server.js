import express, { json } from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { connectToMongoose } from "./src/config/mongoose.config.js";
import { applicationError } from "./src/error Handler/errorHandling.js";
import { userRouter } from "./src/features/users/users.router.js";

const server = express();

server.use(cors());
server.use(express.json());
server.use(cookieParser())
server.use(express.urlencoded({"extended":true}))
connectToMongoose();



server.use("/api/user",userRouter);


server.use((err,req,res,next)=>{
    if(err instanceof applicationError){
        return res.status(err.status).json({success:false,message:err.message,hh:"huihui",status:{err.status}})
    }
    return res.status(500).json({success:false,message:"Internal Server Error"})
})

server.listen(1000,()=>{
    console.info("Server is connected successfully");
})