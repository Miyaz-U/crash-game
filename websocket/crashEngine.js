const WebSocket = require('ws');
const Bet = require('../models/Bet'); // Import Bet model
const fetchBTCPrice = require('../utils/cryptoPrice');

let clients = [];
let liveBets = []; // Active users in current round
let multiplier = 1.0;
let crashPoint = 0;
let gameInProgress = false;

function startCrashGame(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log("✅ WebSocket client connected");
    clients.push(ws);

    ws.send(JSON.stringify({ type: 'info', message: 'Connected to Crash Game' }));

    ws.on('message', async (message) => {
      const data = JSON.parse(message);

      if (data.type === 'place_bet') {
        liveBets.push({ ws, username: data.username, amount: data.amount, cashedOut: false });
        ws.send(JSON.stringify({ type: 'bet_placed', message: `Bet of ${data.amount} accepted` }));
      }

      if (data.type === 'cash_out' && gameInProgress) {
        const userBet = liveBets.find(bet => bet.ws === ws && !bet.cashedOut);
        if (userBet) {
          userBet.cashedOut = true;
          userBet.multiplier = multiplier;

          const payout = parseFloat((userBet.amount * multiplier).toFixed(2));
          await Bet.create({
            username: userBet.username,
            amount: userBet.amount,
            multiplier,
            result: 'win',
            payout
          });

          ws.send(JSON.stringify({ type: 'cashed_out', message: `Cashed out at ${multiplier}x for ₹${payout}` }));
        }
      }
    });

    ws.on('close', () => {
      clients = clients.filter(client => client !== ws);
    });
  });

  setInterval(() => {
    if (!gameInProgress) {
      multiplier = 1.0;
      crashPoint = generateCrashPoint();
      gameInProgress = true;
      liveBets = [];

      broadcast({ type: 'start', crashPoint });
      increaseMultiplier();
    }
    setInterval(async () => {
        const price = await fetchBTCPrice();
        if (price) {
            broadcast({ type: 'btc_price', inr: price });
        }
    }, 60000); // every 10 seconds
  }, 10000);
}

function increaseMultiplier() {
  const interval = setInterval(async () => {
    multiplier += 0.1;
    multiplier = parseFloat(multiplier.toFixed(2));

    if (multiplier >= crashPoint) {
      broadcast({ type: 'crash', at: multiplier });

      // Save losing bets
      for (let bet of liveBets) {
        if (!bet.cashedOut) {
          await Bet.create({
            username: bet.username,
            amount: bet.amount,
            multiplier,
            result: 'lose',
            payout: 0
          });

          bet.ws.send(JSON.stringify({ type: 'lost', message: `Crashed at ${multiplier}x. You lost ₹${bet.amount}` }));
        }
      }

      gameInProgress = false;
      clearInterval(interval);
    } else {
      broadcast({ type: 'multiplier', value: multiplier });
    }
  }, 1000);
}

function generateCrashPoint() {
  return parseFloat((Math.random() * 4 + 1).toFixed(2)); // e.g. 1.0x – 5.0x
}

function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

module.exports = startCrashGame;