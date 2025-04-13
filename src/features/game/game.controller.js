import { GameRepository } from "./game.repository.js";

class GameController {
  givingTimer = (req, res, next) => {
    let value = 1; // 👈 per-client counter
  
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    const interval = setInterval(() => {
      console.log('sending to one client:', value);
      res.write(`data: ${value}\n\n`);
      value++; // 👈 this value is local to each user
    }, 1000);
  
    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval);
    });
  };
}  

export { GameController };
