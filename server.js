const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http'); // 👈 Required for WebSocket
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log('DB Error:', err.message));

// Routes
app.use('/api/auth', require('./routes/auth'));
// app.use('/api/game', require('./routes/game'));

// Create raw HTTP server to attach WebSocket
const server = http.createServer(app);

// Start WebSocket crash engine
const startCrashGame = require('./websocket/crashEngine');
startCrashGame(server);

// Start server on port
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on ${PORT}`));