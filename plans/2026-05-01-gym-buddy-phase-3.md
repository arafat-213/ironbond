# Gym Buddy: Phase 3 - Competition & Steps Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the step-tracking synchronization API, the "Passive Rivalry" leaderboard, and the Weekly MVP calculation engine.

**Architecture:** Extend backend services. Steps will be received as batch logs from the mobile app.

**Tech Stack:** Node.js, TypeScript, Prisma.

---

### Task 1: Step Sync & Leaderboard

**Files:**
- Create: `backend/src/routes/steps.ts`
- Create: `backend/src/services/StepService.ts`
- Modify: `backend/src/index.ts`

- [ ] **Step 1: Implement Step Sync API**
POST `/api/steps/sync`: Accept a count and a timestamp for a user.

- [ ] **Step 2: Implement Duo Step Leaderboard**
GET `/api/steps/leaderboard/:duoId`: Compare the today's step counts for both partners.

- [ ] **Step 3: Commit**
```bash
git add backend/src/routes/steps.ts backend/src/services/StepService.ts
git commit -m "feat: add step sync and leaderboard"
```

---

### Task 2: Weekly MVP Engine

**Files:**
- Create: `backend/src/services/MVPService.ts`
- Create: `backend/src/jobs/mvpCron.ts`

- [ ] **Step 1: Implement MVP Calculation**
Logic: Score = (Workout Count * 100) + (Total Volume / 1000) + (Total Steps / 100).
Compare scores at the end of the week.

- [ ] **Step 2: Setup Weekly Cron**
Run every Sunday night to crown the new "Weekly MVP" and reset local counters.

- [ ] **Step 3: Commit**
```bash
git add backend/src/services/MVPService.ts backend/src/jobs/mvpCron.ts
git commit -m "feat: implement weekly MVP calculation engine"
```
