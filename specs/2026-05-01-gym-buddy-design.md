# IronBond Design Specification: The Duo Hub

**Date:** 2026-05-01
**Topic:** IronBond App - Collaborative Fitness Tracking
**Status:** Approved (Brainstorming Phase)

## 1. Vision & Purpose
IronBond is a fitness application designed fundamentally for partners and couples. While it provides high-quality individual workout tracking, its "soul" lies in the collaborative experience. It aims to solve the "motivation gap" by creating a shared accountability system where your fitness progress directly impacts your partner's experience and vice versa.

## 2. Core Mechanics

### 2.1 The Duo Connection
*   **The Link:** A user "Invites" another user via a unique code or link. Once accepted, they become a permanent "Duo."
*   **Shared State:** Key metrics are shared globally within the Duo.
*   **Privacy Model:** Partners have full visibility into each other's workout logs and muscle heatmaps to foster accountability and encouragement.

### 2.2 Shared Streak (The Accountability Engine)
*   **Goal:** Maintain an unbroken daily streak.
*   **Logic:** The streak increments only if *both* users complete their daily fitness goal (e.g., logging a workout or hitting a step target).
*   **Shared Failure:** If one person fails, the streak resets for both. This "don't let your partner down" mechanic is the primary retention driver.
*   **Nudges:** Push notifications alert both users when a streak is at risk (e.g., at 8:00 PM if one user hasn't logged).

### 2.3 Weekly MVP (The Internal Rivalry)
*   **Logic:** A friendly competition within the Duo.
*   **Metrics:** Calculated based on a weighted score of workout volume, consistency, and step counts.
*   **Reward:** The winner is crowned "Weekly MVP" and displayed prominently on the Duo Dashboard.

### 2.4 Passive Step Rivalry
*   **Logic:** Daily steps are tracked in the background via health integrations (Google Fit/HealthKit).
*   **Display:** A secondary, always-on leaderboard showing who is leading the step count for the current day.

## 3. Visualization: The Muscle Heatmap
*   **Concept:** A 2D/3D body model for each user.
*   **Logic:** Muscles "light up" (from grey to red) based on the training volume logged for that muscle group over the last 7 days.
*   **Duo View:** The dashboard shows both your heatmap and your partner's heatmap side-by-side for easy comparison and motivation.

## 4. Architecture & Data Model

### 4.1 Entities
*   **User:** Profile, Workout Splits, Workout Logs, Step History.
*   **Duo:** ID, User1_ID, User2_ID, SharedStreakCount, CurrentMVP_ID, CreatedDate.
*   **WorkoutLog:** User_ID, Exercise_ID, Sets, Reps, Weight, Timestamp.

### 4.2 Tech Stack (Initial Recommendation)
*   **Frontend:** React Native or Flutter (for iOS/Android health integrations).
*   **Backend:** Node.js (Express) with a PostgreSQL database.
*   **Real-time:** WebSockets or Push Notifications (Firebase) for "Nudges."

## 5. UI/UX Overview
*   **Duo Dashboard:** The primary landing page featuring the Shared Streak, MVP status, and side-by-side Heatmaps.
*   **Workout Logger:** A high-speed interface for logging sets and reps with "copy from last time" functionality.
*   **Stats Tab:** Deeper dive into personal volume charts and historical PRs.

## 6. Success Criteria
*   **User Retention:** High daily active usage driven by the Shared Streak.
*   **Engagement:** Frequency of "Nudges" and "High-Fives" sent between partners.
*   **Health Impact:** Measurable increase in workout frequency for linked duos vs. solo users.
