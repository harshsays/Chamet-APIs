import express from "express";
import { userController } from "./users.controller.js";

const userRouter=express.Router();
const userControl=new userController()

userRouter.post("/signin",userControl.signIn)
userRouter.post("/signup",userControl.signUp)

export {userRouter}