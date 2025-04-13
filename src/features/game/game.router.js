import express from "express";
import { GameController } from "./game.controller.js";

const gameRouter=express.Router();
const gameController=new GameController();

gameRouter.get("/",gameController.givingTimer)




export {gameRouter}