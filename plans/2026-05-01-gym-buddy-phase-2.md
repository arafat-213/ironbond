# IronBond: Phase 2 - Workouts & Shared Streaks Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the core workout logging engine, the automated Shared Streak logic, and the Muscle Heatmap data aggregation API.

**Architecture:** Extend the Express backend. Use a service-based approach for business logic (StreakService, HeatmapService).

**Tech Stack:** Node.js, TypeScript, Prisma, node-cron (for daily streak checks).

---

### Task 1: Workout Logging & Exercise Library

**Files:**
- Create: `backend/src/routes/workout.ts`
- Create: `backend/src/services/WorkoutService.ts`
- Modify: `backend/src/index.ts`

- [ ] **Step 1: Implement WorkoutService**
Create a service to handle saving workout logs and calculating total volume (Weight * Reps).

- [ ] **Step 2: Implement Workout Routes**
POST `/api/workouts`: Save a workout log.
GET `/api/workouts/history/:userId`: Retrieve workout history.

- [ ] **Step 3: Commit**
```bash
git add backend/src/routes/workout.ts backend/src/services/WorkoutService.ts
git commit -m "feat: add workout logging service and routes"
```

---

### Task 2: Shared Streak Engine

**Files:**
- Create: `backend/src/services/StreakService.ts`
- Create: `backend/src/jobs/streakCron.ts`

- [ ] **Step 1: Implement Streak Update Logic**
Logic: If both users in a Duo have logged a workout today, increment `sharedStreak`. If the day ends and one hasn't, reset to 0.

- [ ] **Step 2: Setup Daily Cron Job**
Use `node-cron` to run a check at midnight to finalize the previous day's streak status.

- [ ] **Step 3: Commit**
```bash
git add backend/src/services/StreakService.ts backend/src/jobs/streakCron.ts
git commit -m "feat: implement shared streak logic and cron job"
```

---

### Task 3: Muscle Heatmap Data API

**Files:**
- Create: `backend/src/routes/stats.ts`
- Create: `backend/src/services/HeatmapService.ts`

- [ ] **Step 1: Implement Heatmap Aggregator**
Logic: Query workouts from the last 7 days, group by muscle group, and calculate a "Heat Score" (0 to 1).

- [ ] **Step 2: Implement Stats Route**
GET `/api/stats/heatmap/:userId`: Returns a JSON mapping of muscle groups to heat levels.

- [ ] **Step 3: Commit**
```bash
git add backend/src/routes/stats.ts backend/src/services/HeatmapService.ts
git commit -m "feat: add muscle heatmap data aggregation"
```
