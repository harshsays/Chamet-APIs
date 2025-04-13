import { GameRepository } from "./game.repository.js";

// Global counter that is shared across all clients
let globalCounter = 1;
let clients = []; // Array to hold all connected clients

class GameController {
  constructor() {}

  // This method will handle the EventSource stream for all clients
  givingTimer = (req, res, next) => {
    // Set headers to handle the EventSource (SSE)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Add the client to the clients list
    clients.push(res);

    // Send the current value to the new client
    res.write(`data: ${globalCounter}\n\n`);

    // Broadcast the same value to all clients every 1 second
    const interval = setInterval(() => {
      globalCounter++;  // Increment the global counter
      console.log('sending message to all clients: ', globalCounter);
      
      // Send the current value to all connected clients
      clients.forEach(client => {
        client.write(`data: ${globalCounter}\n\n`);
      });
    }, 1000);

    // When the client closes the connection, remove them from the clients list
    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval);  // Stop broadcasting when the client disconnects
      clients = clients.filter(client => client !== res); // Remove client from the list
    });
  };
}

export { GameController };
