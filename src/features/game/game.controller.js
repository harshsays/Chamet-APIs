// import { GameRepository } from "./game.repository.js";

// // Global counter that will be shared among all connections
// let globalCounter = 1;
// setInterval(()=>{
//   globalCounter++;
// },1000)
// class GameController {
//   constructor() {}

//   givingTimer = (req, res, next) => {
//     res.setHeader('Content-Type', 'text/event-stream');
//     res.setHeader('Cache-Control', 'no-cache');
//     res.setHeader('Connection', 'keep-alive');
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Broadcast the same value to all clients every 1 second
//     const interval = setInterval(() => {
//       console.log('sending message to all clients: ', globalCounter);
//       res.write(`data: ${globalCounter}\n\n`);
//     }, 1000);

//     req.on('close', () => {
//       console.log('client closed connection');
//       clearInterval(interval);  // Stop sending messages if the client closes the connection
//     });
//   };
// }

// export { GameController };


import { GameRepository } from "./game.repository.js";

let globalCounter = 1;

class GameController {
  constructor() {}

  givingTimer = (req, res, next) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let interval;

    const startInterval = () => {
      globalCounter = 1; // ✅ Reset before starting
      interval = setInterval(() => {
        res.write(`data: ${globalCounter}\n\n`);
        console.log('sending message to all clients: ', globalCounter);
        globalCounter++;
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
        console.log("⏸️ Paused for 6 seconds");
        res.write(`data: ---paused---\n\n`);
        setTimeout(() => {
          startInterval(); // ✅ Start again after pause
        }, 6000);
      }, 30000); // ⏱️ Stop after 30s
    };

    startInterval();

    req.on('close', () => {
      console.log('client closed connection');
      clearInterval(interval);
    });
  };
}

export { GameController };

