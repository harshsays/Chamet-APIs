import { GameRepository } from "./game.repository.js";

class GameController {
  constructor() {
    this.value = 1;  // Global counter that increments for all users
  }

  givingTimer = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');  // Make sure to allow all origins for CORS

    // Send the same value to every connected client every 1 second
    const interval = setInterval(() => {
      console.log('sending message to all clients: ', this.value);
      res.write(`data: ${this.value}\n\n`);  // Send the current value to the client
      this.value++;  // Increment the value for the next broadcast
    }, 1000);

    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval);  // Stop sending messages if the client closes the connection
    });
  };
}

export { GameController };
