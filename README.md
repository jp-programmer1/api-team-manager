# Planning Poker API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![WebSocket](https://img.shields.io/badge/WebSocket-000000?style=for-the-badge&logo=websocket&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

## Overview

Real-time Planning Poker API built with NestJS and WebSockets. It enables agile teams to estimate collaboratively with rooms, anonymous voting, vote reveal, and resets.

## Features

- ✅ Create and manage rooms
- ✅ Real-time updates via WebSockets (Socket.IO)
- ✅ Anonymous voting flow
- ✅ Reveal votes
- ✅ Reset votes
- ✅ Auto-generated API docs with Swagger

## Prerequisites

- Node.js v14 or newer
- npm or yarn
- Nest CLI (optional, for local development)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd planning-poker-node
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment variables (optional):
   Create a `.env` file in the project root:
   ```
   PORT=3000
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

   App: `http://localhost:3000`
   Swagger UI: `http://localhost:3000/api`

## Usage

### HTTP Endpoints

- `POST /rooms` - Create a new room
- `POST /rooms/join` - Join an existing room
- `POST /rooms/vote` - Cast a vote
- `POST /rooms/:id/reset` - Reset votes of a room
- `POST /rooms/:id/reveal` - Reveal votes of a room
- `GET /rooms/:id` - Get room info
- `DELETE /rooms/:roomId/users/:userId` - Remove a user from a room

### WebSocket Events

Namespace: `/poker`

Incoming events (client -> server):
- `joinRoom` { roomId }
- `vote` { roomId, userId, vote }
- `revealVotes` { roomId }
- `resetVotes` { roomId }
- `informGitlab` { roomId, iteration, issues }
- `setWeight` { roomId, issueIid, weight }
- `setSelectedIssue` { roomId, issueIid }
- `closeRoom` { roomId }

Outgoing events (server -> clients):
- `userJoined` [{ id, username, voted }]
- `userVoted` { userId, hasVoted }
- `votesRevealed` { users: [{ id, vote }], showVotes }
- `votesReset` { room }
- `updateInformGitlab` { ...room }
- `updateSelectedIssue` { ...room }
- `roomRemoved` roomId
- `error` { message }

### cURL Examples

1. Create a room
   ```bash
   curl -X POST http://localhost:3000/rooms \
     -H "Content-Type: application/json" \
     -d '{"name":"Sprint 15","username":"Juan","userId":1}'
   ```

2. Join a room
   ```bash
   curl -X POST http://localhost:3000/rooms/join \
     -H "Content-Type: application/json" \
     -d '{"roomId":"<room-id>","username":"Maria","userId":2}'
   ```

3. Cast a vote
   ```bash
   curl -X POST http://localhost:3000/rooms/vote \
     -H "Content-Type: application/json" \
     -d '{"roomId":"<room-id>","userId":1,"vote":"5"}'
   ```

## Project Structure

```
src/
├── common/               # Shared code
│   ├── dtos/             # Data transfer objects (DTOs)
│   └── interfaces/       # TypeScript interfaces
├── events/               # WebSocket gateway and logic
├── rooms/                # Rooms module (controller/service)
└── app.module.ts         # Root module
```

## Available Scripts

- `npm run start` - Start the app
- `npm run start:dev` - Start in watch mode
- `npm run build` - Compile TypeScript
- `npm run format` - Format code with Prettier
- `npm run lint` - Lint code with ESLint
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage

## Deployment

To build and run in production:

```bash
npm run build
npm run start:prod
```

## Contributing

Contributions are welcome. Please read the [contribution guidelines](CONTRIBUTING.md) for details.

## Support

If you need help, please open an issue in the repository.

## License

This project is currently marked as `UNLICENSED` in `package.json`.
