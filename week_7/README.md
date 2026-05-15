# LivePoll — Real-Time Polling App

A real-time polling application built with **Express.js** and **Socket.IO**.  
Users can vote on a question and see results update live across all connected browsers.

---

## Features

- Real-time vote updates pushed to all connected clients via WebSockets
- Per-session vote tracking (one vote per socket connection)
- Live connected-user count
- Poll reset functionality (broadcasts to all clients)
- Animated progress bars showing live vote percentages
- Connection status indicator

---

## Tech Stack

| Layer    | Technology        |
|----------|-------------------|
| Server   | Node.js + Express |
| Sockets  | Socket.IO v4      |
| Frontend | Vanilla HTML/CSS/JS |

---

## Project Structure

```
socket-chat-app/
├── server.js          # Express server + Socket.IO event logic
├── package.json       # Dependencies
└── public/
    └── index.html     # Frontend UI + Socket.IO client
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the server

```bash
npm start
```

Or with auto-reload during development:

```bash
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

Open in **multiple tabs or browsers** to see real-time updates in action.

---

## Socket Events

| Event         | Direction         | Description                          |
|---------------|-------------------|--------------------------------------|
| `poll:state`  | Server → Client   | Sends full poll state on connect     |
| `poll:vote`   | Client → Server   | User submits a vote for an option    |
| `poll:update` | Server → All      | Broadcasts updated vote counts       |
| `poll:voted`  | Server → Client   | Confirms the vote was recorded       |
| `poll:reset`  | Client → Server   | Requests a poll reset                |
| `poll:reset`  | Server → All      | Broadcasts reset to all clients      |
| `poll:error`  | Server → Client   | Sends error (e.g. already voted)     |
| `users:count` | Server → All      | Broadcasts current connected users   |

---

## How It Differs from Workshop 7

The workshop demonstrated a basic chat application. This project instead implements:

- A **live polling system** (different domain and use case)
- **Vote state management** on the server with per-socket tracking
- **Animated bar chart** results rendered in real time on the client
- **One-vote-per-session** enforcement on the server
- **Poll reset** as a dedicated socket event

---

## License

MIT
