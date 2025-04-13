import { GameRepository } from "./game.repository.js";

class GameController {
  constructor() {
    this.value = 1;
  }

  givingTimer = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ Using wildcard without credentials is fine

    // Send message every second in proper SSE format
    const interval = setInterval(() => {
      console.log('sending message');
      res.write(`data: ${this.value}\n\n`); // ✅ SSE format requires "data:" and double newlines
      this.value++;
    }, 1000);

    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval);
    });
  };
}

export { GameController };
