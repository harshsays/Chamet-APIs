import { GameRepository } from "./game.repository.js";

// Global counter that will be shared among all connections
let globalCounter = 1;

function timeout(){
  setTimeout(()=>{
    globalCounter=1;
    start();
  },15000)
}

function start (){
    let inn=setInterval(()=>{
      if(globalCounter==30){
        clearInterval(inn);
        timeout();
      }
      globalCounter++;
    },1000)
}

start();
class GameController {
  constructor() {}

  givingTimer = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Broadcast the same value to all clients every 1 second
    const interval = setInterval(() => {
      console.log('sending message to all clients: ', globalCounter);
      res.write(`data: ${globalCounter}\n\n`);
    }, 1000);

    // req.on('close', () => {
    //   console.log('client closed connection');
    //   // clearInterval(interval);  // Stop sending messages if the client closes the connection
    // });
  };
}

export { GameController };

