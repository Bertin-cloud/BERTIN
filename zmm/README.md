# ⬡ ZMM — Zoom Meeting Model

A full-stack real-time meeting platform built with React + Node.js + LiveKit WebRTC.

---

## 📁 Project Structure

```
zmm/
├── backend/                  # Node.js + Express API
│   ├── server.js             # Main entry point
│   ├── .env                  # LiveKit credentials + config
│   ├── routes/
│   │   ├── auth.js           # Login + guest JWT auth
│   │   ├── meetings.js       # Meeting CRUD + announcements
│   │   └── livekit.js        # LiveKit token generation
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   └── data/
│       └── store.js          # In-memory data store
│
├── frontend/                 # React app
│   └── src/
│       ├── App.js            # Root routing
│       ├── context/
│       │   ├── AuthContext.js    # Login state (JWT)
│       │   └── LangContext.js    # EN / FR / RW translations
│       ├── pages/
│       │   ├── Landing.js    # Login + Join landing
│       │   ├── Dashboard.js  # User dashboard
│       │   ├── Admin.js      # Admin panel
│       │   └── Room.js       # LiveKit video room
│       ├── components/
│       │   ├── Navbar.js     # Top navigation
│       │   └── Chat.js       # In-room real-time chat
│       └── utils/
│           └── api.js        # API helper functions
│
├── start.sh                  # One-command startup
└── README.md
```

---

## 🚀 Quick Start

### 1. Install dependencies (first time only)
```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2. Start the app
```bash
# Terminal 1 — Backend
cd backend
node server.js
# → Running on http://localhost:4000

# Terminal 2 — Frontend
cd frontend
npm start
# → Opens http://localhost:3000
```

Or use the convenience script:
```bash
./start.sh
```

---

## 🔑 Credentials

### Admin Login
| Field    | Value                  |
|----------|------------------------|
| Username | `Bertin`               |
| Password | `Bertin@1234567890`    |

### LiveKit (pre-configured in .env)
```
LIVEKIT_URL=wss://conference-hbqz5vdt.livekit.cloud
LIVEKIT_API_KEY=APIPF4uEDAnnGcQ
LIVEKIT_API_SECRET=LGZEqkjPlUgnUPNS5nSaBcZy6gnxQT0xbK6HaSZOhAC
```

---

## 🎯 Features

| Feature | Status |
|---------|--------|
| Admin login (JWT, no PHP) | ✅ |
| Guest join with Meeting ID + Password | ✅ |
| Create / delete meetings | ✅ |
| Breakout rooms | ✅ |
| Real video via LiveKit WebRTC | ✅ |
| Participant list (live) | ✅ |
| In-room chat (LiveKit DataChannel) | ✅ |
| Announcements system | ✅ |
| Copy meeting link | ✅ |
| Role system: host / co-host / participant | ✅ |
| Multi-language: EN / FR / RW | ✅ |
| Host video ON by default | ✅ |
| Participants viewer-only by default | ✅ |

---

## 🌐 How It Works

1. **Admin** logs in → creates a meeting (gets Meeting ID + password)
2. **Admin** shares Meeting ID + Password with participants
3. **Participants** visit the site → enter ID + password + display name → join
4. Backend generates a **LiveKit token** with correct permissions (publish for host, subscribe-only for participants)
5. Frontend connects to **LiveKit cloud** for real-time video/audio/chat

---

## 🔧 Upgrading to a Database

The backend uses in-memory storage (data resets on restart).
To add MySQL, replace `backend/data/store.js` functions with MySQL queries using `mysql2` package.

---

## 📱 Future: Flutter Mobile App
The project documentation includes plans for a Flutter mobile version.
The backend API is already mobile-ready — all endpoints work with HTTP + JWT.
