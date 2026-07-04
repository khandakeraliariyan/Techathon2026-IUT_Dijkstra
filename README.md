# Smart Office Energy Monitoring System

## Project Overview

Smart Office Energy Monitoring System is a full-stack web application for monitoring office energy consumption, room activity, device status, alerts, analytics, and AI-generated operational insights in real time.

The project was built for the IUT RS Techathon. It combines a React dashboard with a Node.js backend, MongoDB persistence, Socket.IO live updates, background simulation jobs, and optional Gemini-powered AI summaries.

## Project Links

- Live demo:
- Video demo:
- Presentation:
- Repository:
- Backend deployment:
- Frontend deployment:

## Problem Statement

Modern offices often waste electricity because lights, fans, air conditioners, and other devices remain active when rooms are empty or when usage patterns are inefficient. Facility teams need a simple way to observe device activity, understand room-level power consumption, identify unusual usage, and respond to alerts quickly.

## Proposed Solution

This system provides a centralized smart office dashboard where users can:

- View real-time room and device status
- Monitor total and historical power usage
- Track alert conditions
- Analyze office energy patterns
- Receive AI-generated insight summaries
- Use simulated smart-device data for demonstration and testing

The backend stores office data in MongoDB, runs scheduled jobs, simulates device activity, and broadcasts live events to the frontend through Socket.IO.

## Key Features

- Real-time office energy monitoring dashboard
- Room-wise device organization
- Device status tracking and status update API
- Live Socket.IO updates for devices, alerts, power, and dashboard data
- Power usage summary and historical power data
- Analytics view for usage trends and metrics
- AI insight endpoint with Gemini support when configured
- Fallback insight summary when Gemini is not configured
- Alert listing and alert update broadcasting
- Device simulation for demo environments
- Background scheduler for alert checks and power snapshots
- Optional Discord bot integration for office-related queries and notifications
- Responsive React interface built with Tailwind CSS

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Recharts
- Framer Motion
- Socket.IO client

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- Node Cron
- Joi
- Helmet and compression middleware

## Project Structure

```text
backend/   - Express API, MongoDB models, simulator, scheduler
frontend/  - React dashboard and UI components
```

## Prerequisites

Before running the app, make sure you have:

- Node.js 18+ and npm
- A MongoDB instance or MongoDB Atlas connection string
- Optional: a Gemini API key for AI insights

## Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd Techathon2026-IUT_Dijkstra
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

Seed demo data:

```bash
npm run seed
```

Start the backend server:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:5173`.

## Available Scripts

### Backend
- `npm run dev` - start the backend with nodemon
- `npm start` - start the backend in production mode
- `npm run seed` - populate sample rooms, devices, and alerts
- `npm run discord:bot` - run the Discord bot service

### Frontend
- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint checks

## Notes

- If `GEMINI_API_KEY` is not provided, the backend will fall back to a built-in insight summary.
- The backend automatically starts the simulator, scheduler, and socket server when launched.

For more detailed usage and endpoint information, see the backend and frontend README files.
