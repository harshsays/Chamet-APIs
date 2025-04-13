import { GameRepository } from "./game.repository.js";


class GameController {
  constructor (){
    this.value=1;
  }
  givingTimer=(req,res,next)=>{
    res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
res.setHeader('Access-Control-Allow-Origin', '*'); // You already added this ✅



    
  
    // Send a message to the client every 5 seconds
    const interval = setInterval(() => {
      console.log('sending message');
      res.write(String(this.value)+"\n");
      this.value++;
    }, 1000);
  
    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval); // Stop sending messages after user closes connection
    });
  }
}

export { GameController };
