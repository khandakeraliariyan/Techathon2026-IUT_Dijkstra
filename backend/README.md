# Smart Office Energy Monitoring Backend

> Production-quality Node.js + Express backend for an Office Energy Monitoring System.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-API-000000?logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101?logo=socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Current-47A248?logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Planned-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-Planned-2D3748?logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Planned-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Table of Contents

- [1. Project Title](#1-project-title)
- [2. Overview](#2-overview)
- [3. Features](#3-features)
- [4. Tech Stack](#4-tech-stack)
- [5. Folder Structure](#5-folder-structure)
- [6. Backend Architecture](#6-backend-architecture)
- [7. Request Flow](#7-request-flow)
- [8. Device Simulation Engine](#8-device-simulation-engine)
- [9. Alert Engine](#9-alert-engine)
- [10. Database](#10-database)
- [11. API Documentation](#11-api-documentation)
- [12. WebSocket Events](#12-websocket-events)
- [13. Environment Variables](#13-environment-variables)
- [14. Installation](#14-installation)
- [15. Development](#15-development)
- [16. Error Handling](#16-error-handling)
- [17. Logging](#17-logging)
- [18. Security](#18-security)
- [19. Performance](#19-performance)
- [20. Testing](#20-testing)
- [21. Deployment](#21-deployment)
- [22. API Examples](#22-api-examples)
- [23. Troubleshooting](#23-troubleshooting)
- [24. Future Improvements](#24-future-improvements)
- [25. License](#25-license)

## 1. Project Title

**Smart Office Energy Monitoring Backend**

This backend powers a realtime office energy monitoring platform. It provides REST APIs, Socket.IO events, scheduled background processing, simulated device activity, alert generation, optional AI insights, and optional Discord bot support.

Repository role:

| Item | Description |
| --- | --- |
| Type | Backend API service |
| Runtime | Node.js |
| Framework | Express.js |
| Realtime | Socket.IO |
| Current database | MongoDB with Mongoose |
| Planned database | PostgreSQL |
| Planned ORM | Prisma |
| License | MIT |

## 2. Overview

The backend is the single source of truth for the Office Energy Monitoring System.

It serves three major consumers:

| Consumer | What it gets from the backend |
| --- | --- |
| Web Dashboard | Rooms, devices, power usage, alerts, analytics, and AI insights. |
| Discord Bot | Office status queries and notification workflows. |
| Device Simulator | Shared services for simulated smart-device state updates. |

Using one backend keeps business rules centralized. Device status, power calculations, alert logic, historical snapshots, and realtime events all flow through the same service layer instead of being duplicated across the dashboard, simulator, and bot.

The backend currently uses MongoDB and Mongoose. The requested PostgreSQL, Prisma, Docker, JWT, and testing items are documented as production placeholders where they are not yet implemented.

## 3. Features

### REST API

- Versioned API under `/api/v1`
- Device, room, dashboard, power, alert, analytics, AI, and Discord route groups
- Consistent JSON response wrapper
- Joi validation for supported write operations
- Centralized error middleware

### WebSocket Server

- Socket.IO server initialized with the HTTP server
- Realtime dashboard updates
- Event-driven updates for device, power, alert, and dashboard state
- Used by the frontend to avoid constant polling

### Device Simulation Engine

- Simulates smart-office activity without physical devices
- Runs every 5 seconds
- Randomly selects a device
- Applies office-hour behavior rules
- Updates device status
- Recalculates power usage
- Broadcasts updates to connected clients

### Alert Engine

- Checks alert rules in background jobs and simulator updates
- Detects devices active after office hours
- Detects rooms fully active for more than 2 hours
- Supports unresolved/resolved alert lifecycle
- Includes placeholder for high-power and spike rules

### Room Management

- Stores room metadata
- Links devices to rooms
- Supports room-wise power aggregation
- Provides room data to dashboard views

### Power Usage Calculation

- Calculates total active power
- Calculates room-wise active power
- Stores periodic power snapshots
- Provides historical power usage for charts

### Scheduler

- Uses `node-cron`
- Runs scheduled jobs every minute
- Checks alert rules
- Saves power snapshots
- Emits realtime update events

### Logging

- Uses `morgan` for HTTP request logs
- Uses a project logger utility for startup, scheduler, simulator, and error logs
- Keeps operational events visible during local development

### Error Handling

- Uses async controller wrapper
- Uses global Express error middleware
- Returns consistent error JSON
- Handles database startup failures explicitly

### Health Monitoring

- Current health check: `GET /`
- Requested production health endpoint: `GET /health`
- Readiness checks are planned for database, scheduler, and socket status

## 4. Tech Stack

| Category | Technology | Status |
| --- | --- | --- |
| Runtime | Node.js | Implemented |
| Framework | Express.js | Implemented |
| Current database | MongoDB | Implemented |
| Current ODM | Mongoose | Implemented |
| Requested database | PostgreSQL | Placeholder |
| Requested ORM | Prisma | Placeholder |
| Realtime | Socket.IO | Implemented |
| Validation | Joi | Partially implemented |
| Authentication | JWT | Placeholder |
| Logging | Morgan + custom logger | Implemented |
| Testing | Jest/Vitest + Supertest | Placeholder |
| Scheduler | Node Cron | Implemented |
| AI | Google Generative AI SDK | Implemented |
| Discord | Discord.js | Implemented |
| Security | Helmet, CORS | Implemented |
| Deployment | Docker | Placeholder |

## 5. Folder Structure

```text
src/
  app.js                 # Express app setup
  server.js              # Server bootstrap and socket startup
  config/                # Database connection
  controllers/           # API request handlers
  routes/                # API endpoints
  services/              # Business logic
  models/                # Mongoose schemas
  sockets/               # Socket.IO setup
  simulator/             # Device simulation logic
  jobs/                  # Scheduled background jobs
  discord/               # Discord bot integration
  utils/                 # Helpers and logging
```

## Environment variables

Create a `.env` file in this folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

## Installation

```bash
cd backend
npm install
```

## Run locally

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

The API will run at `http://localhost:5000`.

## Seed demo data

```bash
npm run seed
```

This populates sample rooms, devices, and office configuration data for the dashboard.

## Main API groups

The backend exposes these API areas under `/api/v1`:

- `/devices` - device data and status updates
- `/rooms` - room information
- `/dashboard` - summary dashboard payload
- `/power` - power usage and power history
- `/alerts` - alert listing and state
- `/analytics` - analytics metrics
- `/ai` - AI-generated insights
- `/discord` - Discord integration routes

## Background services

When the server starts, it also launches:

- a device simulator that updates office device activity
- a scheduler that checks alerts and logs power snapshots
- Socket.IO event broadcasting for live updates

## Useful scripts

- `npm run dev` - start with nodemon
- `npm start` - start the production server
- `npm run seed` - load sample data
- `npm run discord:bot` - run the Discord bot separately
| dashboardUpdated |

---

## Database Collections

- rooms
- devices
- alerts
- powerlogs

---

## Architecture

```
Client
    │
    ▼
Express API
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
MongoDB
    │
    ▼
Socket.IO
```

---

## Future Improvements

- JWT Authentication
- Role-based Access Control
- Redis Caching
- MQTT Integration
- ESP32 Integration
- AI-powered Energy Analytics
- Docker Deployment
- Unit & Integration Testing

---

## Developed For

IUT RS Techathon