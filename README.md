# 💥 Crypto Crash Game

A real-time crypto-themed crash betting game built with **Node.js**, **WebSockets**, **MongoDB**, and a lightweight HTML frontend.

### 🔗 Live Demo
Frontend (GitHub Pages): [https://your-username.github.io/crypto-crash-ui](#)  
Backend (Render): [https://crash-game-zenv.onrender.com](https://crash-game-zenv.onrender.com)

---

## 🚀 Features

- 🎯 Real-time crash multiplier generation
- 💸 Betting and manual cash out logic
- 🔁 Live BTC price display (CoinGecko)
- 🧠 Backend with Node.js, Express, MongoDB (Atlas)
- 🔒 JWT-based authentication (login/register)
- 🌐 WebSocket support for real-time updates
- 📱 Minimal, mobile-responsive frontend (pure HTML + CSS)

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express, WebSocket (ws), MongoDB Atlas
- **Frontend:** Vanilla HTML/CSS/JS (deployed via GitHub Pages)
- **Real-time Data:** CoinGecko API
- **Deployment:** Render (backend), GitHub Pages (frontend)

---

## 🗂 Project Structure

crypto-crash/
├── controllers/
│ └── authController.js
├── models/
│ ├── user.js
│ └── Bet.js
├── routes/
│ └── auth.js
├── crashEngine.js
├── cryptoPrice.js
├── server.js
├── .env
└── test.html


---

## ⚙️ Setup Instructions (Local)

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/your-username/crash-game-backend.git
cd crash-game-backend
npm install


PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

🌐 Deployment (Optional)
Backend on Render:
Deploy from GitHub

Set environment variables (MONGO_URI, JWT_SECRET)

Use port 5000 and enable WebSocket support

Frontend on GitHub Pages:
Upload test.html to a repo

Enable GitHub Pages on the main branch

📦 API Endpoints
POST /api/auth/register
Registers a new user
Body:

json
Copy
Edit
{
  "username": "miyaz",
  "email": "user@example.com",
  "password": "yourpass"
}
POST /api/auth/login
Authenticates a user and returns a token
Body:

json
Copy
Edit
{
  "email": "user@example.com",
  "password": "yourpass"
}
🎮 Game Logic (via WebSocket)
place_bet: Place ₹100 bet

cash_out: Cash out before crash

Real-time updates on multiplier, crash, BTC price, win/loss

🧠 Future Improvements
Authentication UI

Leaderboard

Auto cash out option

Real money integration (demo/tokenized)

Enhanced UI/UX (React/Vue)

🙏 Acknowledgements
CoinGecko API

Render

MongoDB Atlas

WebSocket utilities via ws
