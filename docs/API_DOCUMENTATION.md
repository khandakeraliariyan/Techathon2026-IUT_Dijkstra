# API Documentation

> REST and WebSocket API reference for the **Smart Office Energy Monitoring Backend** — a realtime Node.js + Express service for monitoring office devices, power usage, alerts, analytics, and AI insights.

## Table of Contents

- [Base URLs](#base-urls)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Endpoint Summary](#endpoint-summary)
- [Dashboard](#dashboard)
- [Devices](#devices)
- [Rooms](#rooms)
- [Power](#power)
- [Alerts](#alerts)
- [Analytics](#analytics)
- [AI Insights](#ai-insights)
- [Discord Integration](#discord-integration)
- [WebSocket Events](#websocket-events)
- [Health Check](#health-check)

---

## Base URLs

| Purpose | URL |
| --- | --- |
| API base | `http://localhost:5001/api/v1` |
| Root / health | `http://localhost:5001/` |
| WebSocket (Socket.IO) | `http://localhost:5001` |

---

## Response Format

All REST endpoints return a consistent JSON wrapper:

```json
{
  "success": true,
  "message": "Resource fetched successfully",
  "data": {},
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

| Field | Type | Description |
| --- | --- | --- |
| `success` | Boolean | Indicates whether the request succeeded. |
| `message` | String | Human-readable status message. |
| `data` | Object / Array | The response payload. |
| `timestamp` | String (ISO 8601) | Server time the response was generated. |

---

## Error Handling

Errors return a consistent shape through the global error middleware:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

Common status codes:

| Status | Meaning |
| --- | --- |
| `400` | Invalid request body or parameters |
| `404` | Resource not found |
| `500` | Internal server error |

---

## Endpoint Summary

| Method | Endpoint | Description | Parameters |
| --- | --- | --- | --- |
| `GET` | `/` | API running check | None |
| `GET` | `/api/v1/dashboard` | Dashboard summary | None |
| `GET` | `/api/v1/devices` | List all devices | None |
| `GET` | `/api/v1/devices/:id` | Get one device | `id` |
| `PATCH` | `/api/v1/devices/:id/status` | Update device ON/OFF status | `id`, body `status` |
| `GET` | `/api/v1/rooms` | List rooms with devices | None |
| `GET` | `/api/v1/power` | Current power usage | None |
| `GET` | `/api/v1/power/history` | Historical power snapshots | None |
| `GET` | `/api/v1/alerts` | Active alerts | None |
| `GET` | `/api/v1/analytics` | Analytics summary | None |
| `GET` | `/api/v1/insights` | Latest AI energy insight | None |
| `POST` | `/api/v1/discord/ask` | Natural-language Discord query | body `question` |

---

## Dashboard

### `GET /dashboard`

Returns complete dashboard information — devices, rooms, alerts, total and room-wise power, and the last update time.

**Request**

```bash
curl http://localhost:5001/api/v1/dashboard
```

**Response**

```json
{
  "success": true,
  "message": "Dashboard fetched successfully",
  "data": {
    "devices": [],
    "rooms": [],
    "alerts": [],
    "totalPower": 185,
    "roomPower": {
      "Drawing Room": 60,
      "Work Room 1": 70,
      "Work Room 2": 55
    },
    "lastUpdated": "2026-07-04T10:15:30Z"
  }
}
```

---

## Devices

### `GET /devices`

Returns all office devices.

**Request**

```bash
curl http://localhost:5001/api/v1/devices
```

**Response**

```json
{
  "success": true,
  "message": "Devices fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

**Errors**

| Status | Reason |
| --- | --- |
| `500` | Internal server error |

---

### `GET /devices/:id`

Returns a specific device by ID.

**Request**

```bash
curl http://localhost:5001/api/v1/devices/DEVICE_ID
```

**Response**

```json
{
  "success": true,
  "message": "Device fetched successfully",
  "data": {
    "_id": "DEVICE_ID",
    "name": "Main Light",
    "type": "Light",
    "status": true,
    "currentPower": 15
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

**Errors**

| Status | Reason |
| --- | --- |
| `404` | Device not found |
| `500` | Internal server error |

---

### `PATCH /devices/:id/status`

Updates a device's ON/OFF status. The body is validated with Joi.

**Request**

```json
{
  "status": true
}
```

```bash
curl -X PATCH http://localhost:5001/api/v1/devices/DEVICE_ID/status \
  -H "Content-Type: application/json" \
  -d "{\"status\":true}"
```

**Response**

```json
{
  "success": true,
  "message": "Device updated successfully",
  "data": {
    "_id": "DEVICE_ID",
    "name": "Light 1",
    "status": true,
    "currentPower": 15
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

**Errors**

| Status | Reason |
| --- | --- |
| `400` | Invalid body |
| `404` | Device not found |
| `500` | Internal server error |

> Updating a device status recalculates power usage and broadcasts `deviceUpdated`, `powerUpdated`, and `dashboardUpdated` events over Socket.IO.

---

## Rooms

### `GET /rooms`

Returns all rooms with their associated devices.

**Request**

```bash
curl http://localhost:5001/api/v1/rooms
```

**Response**

```json
{
  "success": true,
  "message": "Rooms fetched successfully",
  "data": [],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

---

## Power

### `GET /power`

Returns current total and room-wise power usage.

**Request**

```bash
curl http://localhost:5001/api/v1/power
```

**Response**

```json
{
  "success": true,
  "data": {
    "totalPower": 185,
    "roomPower": {
      "Drawing Room": 60,
      "Work Room 1": 70,
      "Work Room 2": 55
    }
  }
}
```

---

### `GET /power/history`

Returns historical power snapshots, saved periodically by the scheduler for use in charts.

**Request**

```bash
curl http://localhost:5001/api/v1/power/history
```

**Response**

```json
{
  "success": true,
  "message": "Power history fetched successfully",
  "data": [
    {
      "_id": "SNAPSHOT_ID",
      "totalPower": 185,
      "roomPower": {
        "Drawing Room": 60,
        "Work Room 1": 70,
        "Work Room 2": 55
      },
      "createdAt": "2026-07-04T10:00:00.000Z"
    }
  ],
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

---

## Alerts

### `GET /alerts`

Returns active alerts. Alerts are generated by the alert engine for conditions such as devices active after office hours (`09:00 – 17:00`) or rooms fully active for more than 2 hours.

**Request**

```bash
curl http://localhost:5001/api/v1/alerts
```

**Response**

```json
[
  {
    "title": "Device Active After Office Hours",
    "severity": "HIGH",
    "room": "Work Room 1"
  }
]
```

**Alert types:** `AFTER_HOURS`, `ROOM_ACTIVE`, `HIGH_POWER`
**Severities:** `LOW`, `MEDIUM`, `HIGH`

---

## Analytics

### `GET /analytics`

Returns an analytics summary of power and device activity.

**Request**

```bash
curl http://localhost:5001/api/v1/analytics
```

**Response**

```json
{
  "peakPower": 240,
  "averagePower": 172,
  "activeDevices": 6,
  "inactiveDevices": 3,
  "deviceUsage": 67
}
```

| Field | Description |
| --- | --- |
| `peakPower` | Highest recorded power usage (W). |
| `averagePower` | Average power usage (W). |
| `activeDevices` | Number of devices currently ON. |
| `inactiveDevices` | Number of devices currently OFF. |
| `deviceUsage` | Percentage of devices active. |

---

## AI Insights

### `GET /insights`

Returns the latest AI-generated energy insight (powered by the Google Generative AI SDK).

**Request**

```bash
curl http://localhost:5001/api/v1/insights
```

**Response**

```json
{
  "success": true,
  "data": "Work Room 1 consumed more energy than other rooms today. Consider turning off idle devices after office hours to reduce unnecessary power consumption."
}
```

---

## Discord Integration

### `POST /discord/ask`

Processes a natural-language query from the Discord bot and returns an AI-generated response.

**Request**

```json
{
  "question": "Which room is consuming the most power?"
}
```

```bash
curl -X POST http://localhost:5001/api/v1/discord/ask \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"Which room is consuming the most power?\"}"
```

**Response**

```json
{
  "success": true,
  "data": "Work Room 1 is currently consuming the highest amount of power at 70W."
}
```

---

## WebSocket Events

The backend runs a Socket.IO server on `http://localhost:5001` so clients receive realtime updates without polling.

### Client Events

| Event | Payload | Description |
| --- | --- | --- |
| `connection` | Socket handshake | Client connects to server. |
| `disconnect` | None | Client disconnects. |

### Server Events

| Event | Payload | Description |
| --- | --- | --- |
| `deviceUpdated` | Device object | A device status changed. |
| `powerUpdated` | Power object | Power usage changed. |
| `alertUpdated` | Refresh signal | Alerts may need refreshing. |
| `dashboardUpdated` | Dashboard payload | Dashboard state changed. |

**Example payload**

```json
{
  "updatedDevice": {
    "_id": "DEVICE_ID",
    "name": "Main Light",
    "status": true
  },
  "powerData": {
    "totalPower": 120
  },
  "timestamp": "2026-07-04T10:00:00.000Z"
}
```

---

## Health Check

### `GET /`

Confirms the API is running.

**Request**

```bash
curl http://localhost:5001/
```

**Response**

```json
{
  "success": true,
  "message": "Smart Office Monitoring API Running"
}
```
