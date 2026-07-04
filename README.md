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
- Axios
- Socket.IO Client
- Recharts
- Framer Motion
- React Icons
- React Router DOM

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Node Cron
- Joi
- Helmet
- CORS
- Compression
- Morgan
- Cookie Parser
- Discord.js
- Google Generative AI SDK

### Tools and Services

- MongoDB Atlas or local MongoDB
- Gemini API
- Discord Bot API

## System Architecture

```text
Frontend Dashboard
        |
        | REST API requests
        v
Express Backend API
        |
        | Controllers
        v
Service Layer
        |
        | Mongoose models
        v
MongoDB Database

Express Backend API
        |
        | Socket.IO events
        v
Frontend Dashboard

Backend Scheduler + Simulator
        |
        | Updates devices, alerts, and power logs
        v
MongoDB + Socket.IO Broadcasts
```

## Project Structure

```text
Smart_Office_Energy_Monitor_System/
  backend/
    src/
      app.js                  # Express app configuration and route mounting
      server.js               # HTTP server, database connection, socket startup
      config/                 # MongoDB connection
      constants/              # Shared constants such as socket event names
      controllers/            # Request handlers
      discord/                # Discord bot entry point
      jobs/                   # Scheduled background jobs
      middleware/             # Validation and error middleware
      models/                 # Mongoose schemas
      routes/                 # API routes
      scripts/                # Data seeding scripts
      services/               # Business logic
      simulator/              # Device simulator
      sockets/                # Socket.IO setup
      utils/                  # Logger, response helpers, async utilities
    package.json
    README.md

  frontend/
    src/
      App.jsx                 # Main React app
      main.jsx                # React mount point
      assets/                 # Static frontend assets
      components/             # Dashboard, device, alert, layout, and chart UI
      hooks/                  # Data-fetching and socket hooks
      layouts/                # Main layout wrapper
      pages/                  # Dashboard page
      services/               # Axios API and Socket.IO client setup
    public/                   # Public assets
    package.json
    README.md

  README.md
  LICENSE
```

## Screenshots

### Dashboard


### Device Monitoring


### Analytics


### Alerts


### AI Insights


## Prerequisites

Before running the project locally, install or prepare:

- Node.js 18 or later
- npm
- MongoDB local server or MongoDB Atlas connection string
- Gemini API key, optional
- Discord bot token, optional

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5001
NODE_ENV=development
MONGO_URI=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
DISCORD_BOT_TOKEN=
DISCORD_BACKEND_URL=http://localhost:5001/api/v1/discord/ask
```

### Environment Variable Details

| Variable | Required | Description |
| --- | --- | --- |
| `PORT` | Yes | Backend server port. The current frontend API and socket clients point to `5001`. |
| `NODE_ENV` | No | Runtime environment, usually `development` or `production`. |
| `MONGO_URI` | Yes | MongoDB connection string. |
| `GEMINI_API_KEY` | No | Gemini API key for AI-generated insights. |
| `GEMINI_MODEL` | No | Gemini model name. Defaults to `gemini-2.5-flash-lite` in the backend service. |
| `DISCORD_BOT_TOKEN` | No | Discord bot token for the optional bot integration. |
| `DISCORD_BACKEND_URL` | No | Backend URL used by the Discord bot integration. |

## Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Smart_Office_Energy_Monitor_System
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment

Create `backend/.env` and fill in the required values.

```env
PORT=5001
NODE_ENV=development
MONGO_URI=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash-lite
DISCORD_BOT_TOKEN=
DISCORD_BACKEND_URL=http://localhost:5001/api/v1/discord/ask
```

### 4. Seed Demo Data

```bash
npm run seed
```

This creates sample rooms, devices, alerts, and power-related demo data for local testing.

### 5. Start the Backend

```bash
npm run dev
```

The backend should run at:

```text
http://localhost:5001
```

### 6. Install Frontend Dependencies

Open a new terminal from the project root.

```bash
cd frontend
npm install
```

### 7. Start the Frontend

```bash
npm run dev
```

The frontend should run at:

```text
http://localhost:5173
```

## Available Scripts

### Backend Scripts

Run these commands inside `backend/`.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the backend with Nodemon. |
| `npm start` | Starts the backend in production mode. |
| `npm run seed` | Seeds the database with demo data. |
| `npm run discord:bot` | Starts the Discord bot service separately. |

### Frontend Scripts

Run these commands inside `frontend/`.

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Creates a production build. |
| `npm run preview` | Previews the production build locally. |
| `npm run lint` | Runs ESLint checks. |

## API Documentation

Base URL:

```text
http://localhost:5001/api/v1
```

### Health Check

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Confirms that the API is running. |

### Devices

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/devices` | Returns all devices. |
| `GET` | `/devices/:id` | Returns one device by ID. |
| `PATCH` | `/devices/:id/status` | Updates a device status. |

### Rooms

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/rooms` | Returns room data. |

### Dashboard

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/dashboard` | Returns dashboard summary data. |

### Power

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/power` | Returns current power usage data. |
| `GET` | `/power/history` | Returns historical power usage data. |

### Alerts

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/alerts` | Returns system alerts. |

### Analytics

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/analytics` | Returns analytics data. |

### AI Insights

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/ai` | Returns AI-generated or fallback office insight. |

### Discord

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/discord/ask` | Handles an office query through the Discord route. |
| `POST` | `/discord/ask` | Handles an office query through the Discord route. |

## Socket.IO Events

The backend broadcasts live updates through Socket.IO.

| Event | Description |
| --- | --- |
| `connection` | Triggered when a client connects. |
| `disconnect` | Triggered when a client disconnects. |
| `deviceUpdated` | Broadcast when device data changes. |
| `powerUpdated` | Broadcast when power data changes. |
| `alertUpdated` | Broadcast when alert data changes. |
| `dashboardUpdated` | Broadcast when dashboard data changes. |

Socket server URL for local development:

```text
http://localhost:5001
```

## Database Collections

The backend uses MongoDB with Mongoose models for:

- `rooms`
- `devices`
- `alerts`
- `powerlogs`

## Main User Flow

1. The backend connects to MongoDB.
2. The backend starts the HTTP API and Socket.IO server.
3. The simulator updates device and room activity.
4. The scheduler checks alerts and logs power snapshots.
5. The frontend fetches dashboard, device, alert, power, analytics, and insight data.
6. Socket.IO pushes live updates to the dashboard.
7. Users monitor rooms, devices, power usage, alerts, and AI insights from one interface.

## Configuration Notes

- The frontend currently points to `http://localhost:5001/api/v1` for REST API calls.
- The frontend Socket.IO client currently points to `http://localhost:5001`.
- If you change the backend port, update the frontend API and socket service files as well.
- If `GEMINI_API_KEY` is empty, the backend can still return a fallback insight summary.
- The backend starts the simulator, scheduler, Socket.IO server, and Discord bot import during server startup.

## Testing

Manual testing checklist:

- Backend server starts without errors
- MongoDB connects successfully
- Seed script creates demo data
- Frontend loads at `http://localhost:5173`
- Dashboard cards display data
- Device grid displays devices
- Power chart displays usage history
- Alerts panel displays alert data
- AI insight section returns a response
- Socket.IO updates are received by the frontend

Automated tests:


## Deployment

### Frontend Deployment

- Platform:
- Build command:
- Output directory:
- Environment variables:

### Backend Deployment

- Platform:
- Start command:
- Environment variables:
- Database provider:

### Database Deployment

- Provider:
- Connection string location:

## Challenges Faced

- 

## What We Learned

- 

## Future Improvements

- Authentication and authorization
- Role-based access control
- MQTT integration for real IoT devices
- ESP32 or sensor hardware integration
- Redis caching for frequently requested dashboard data
- Docker-based deployment
- Unit and integration testing
- Configurable frontend API base URL through environment variables
- Advanced AI energy recommendations
- Exportable analytics reports
- Admin panel for room and device management

## Team

| Name | Role | GitHub/LinkedIn |
| --- | --- | --- |
|  |  |  |
|  |  |  |
|  |  |  |
|  |  |  |

## Contributors

- 

## License

This project is licensed under the terms in the [LICENSE](LICENSE) file.

