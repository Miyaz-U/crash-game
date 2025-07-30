const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  username: String, // or userId if you implemented login
  amount: Number,
  multiplier: Number,      // at which user cashed out
  result: String,          // "win" or "lose"
  payout: Number,          // amount * multiplier if win, else 0
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bet', betSchema);