import express from "express";
import { userController } from "./users.controller.js";
import { UserValidations } from "./users.validator.js";

const userRouter=express.Router();
const userControl=new userController()
const validation=new UserValidations();

userRouter.post("/signin",validation.signIn,userControl.signIn)
userRouter.post("/signup",validation.signUp,userControl.signUp)

export {userRouter}