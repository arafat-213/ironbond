# IronBond API Contracts

This document outlines the API endpoints, request schemas, and sample responses for the IronBond backend.

**Base URL:** `http://localhost:3000/api`

---

## 1. Duo Management

### Get Duo Status
Retrieve consolidated status for the dashboard, including streaks, partner activity, weekly MVP, and aggregated heatmap/step data.

*   **Endpoint:** `GET /duo/status/:userId`
*   **Success Response (200 OK):**
    ```json
    {
      "streakCount": 12,
      "partnerName": "Sarah",
      "partnerFinished": true,
      "weeklyMVP": {
        "name": "Sarah",
        "stat": "Weekly Top Performer"
      },
      "heatmaps": {
        "me": 0.45,
        "partner": 0.82
      },
      "steps": {
        "me": 8432,
        "partner": 10214
      }
    }
    ```

### Accept Invite
Link two users into a Duo.

*   **Endpoint:** `POST /duo/accept`
*   **Request Body:**
    ```json
    {
      "userId": "uuid-string",
      "inviteCode": "string"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "id": "duo-uuid",
      "sharedStreak": 0,
      "lastStreakUpdate": "2026-05-01T12:00:00Z",
      "weeklyMvpId": null,
      "createdAt": "2026-05-01T12:00:00Z"
    }
    ```
*   **Error Response (400 Bad Request):**
    ```json
    { "error": "Invalid invite" }
    ```

---

## 2. Workouts

### Log a Workout
Record a new workout and calculate training volume.

*   **Endpoint:** `POST /workouts/`
*   **Request Body:**
    ```json
    {
      "userId": "uuid-string",
      "type": "Chest",
      "weight": 80.5,
      "reps": 12
    }
    ```
*   **Success Response (201 Created):**
    ```json
    {
      "id": "workout-uuid",
      "userId": "uuid-string",
      "type": "Chest",
      "volume": 966.0,
      "timestamp": "2026-05-01T14:30:00Z"
    }
    ```

### Get Workout History
Retrieve all workouts for a specific user.

*   **Endpoint:** `GET /workouts/history/:userId`
*   **Success Response (200 OK):**
    ```json
    [
      {
        "id": "workout-uuid-1",
        "type": "Chest",
        "volume": 966.0,
        "timestamp": "2026-05-01T14:30:00Z"
      },
      {
        "id": "workout-uuid-2",
        "type": "Legs",
        "volume": 1200.0,
        "timestamp": "2026-04-30T10:00:00Z"
      }
    ]
    ```

---

## 3. Statistics

### Get Muscle Heatmap
Retrieve normalized training intensity scores (0-1) for each muscle group over the last 7 days.

*   **Endpoint:** `GET /stats/heatmap/:userId`
*   **Success Response (200 OK):**
    ```json
    {
      "Chest": { "totalVolume": 5000, "heatScore": 0.5 },
      "Back": { "totalVolume": 2000, "heatScore": 0.2 },
      "Legs": { "totalVolume": 10000, "heatScore": 1.0 }
    }
    ```

---

## 4. Steps

### Sync Steps
Update or create a step log for a user for the current day.

*   **Endpoint:** `POST /steps/sync`
*   **Request Body:**
    ```json
    {
      "userId": "uuid-string",
      "count": 8500
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
      "id": "step-log-uuid",
      "userId": "uuid-string",
      "count": 8500,
      "date": "2026-05-01T00:00:00Z"
    }
    ```

### Get Duo Step Leaderboard
Compare today's step counts for both partners in a Duo.

*   **Endpoint:** `GET /steps/leaderboard/:duoId`
*   **Success Response (200 OK):**
    ```json
    [
      { "userId": "uuid-1", "name": "Arafat", "steps": 8500 },
      { "userId": "uuid-2", "name": "Partner", "steps": 7200 }
    ]
    ```

---

## 5. Global Error Handling

All endpoints follow a consistent error format for unexpected issues.

*   **Generic Error (500 Internal Server Error):**
    ```json
    {
      "status": "error",
      "message": "Internal Server Error"
    }
    ```
*   **Validation Error (400 Bad Request):**
    (Zod validation error format)
    ```json
    [
      {
        "code": "invalid_type",
        "expected": "string",
        "received": "undefined",
        "path": ["body", "userId"],
        "message": "Required"
      }
    ]
    ```
