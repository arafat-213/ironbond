# Gym Buddy: Backend Best Practices Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the backend with `nodejs-best-practices` by adding Zod validation, centralized error handling, and security middleware.

**Architecture:** 
- **Validation:** Zod schemas at the route level.
- **Error Handling:** Global middleware + Custom `AppError` class.
- **Security:** Helmet and Rate Limiting.

**Tech Stack:** Node.js, TypeScript, Express, Zod, Helmet.

---

### Task 1: Centralized Error Handling & Security Headers

**Files:**
- Create: `backend/src/utils/AppError.ts`
- Create: `backend/src/middleware/errorHandler.ts`
- Modify: `backend/src/index.ts`

- [ ] **Step 1: Install Dependencies**
```bash
cd /home/bacancy/Desktop/Projects/side/gym-duo/backend
npm install zod helmet express-rate-limit
```

- [ ] **Step 2: Create AppError class**
Define a custom error class that captures status codes and operational status.

- [ ] **Step 3: Implement Global Error Middleware**
Create a middleware that catches all errors and returns a consistent JSON response.

- [ ] **Step 4: Integrate Helmet & Rate Limit in index.ts**
Add security headers and basic rate limiting to the Express app.

- [ ] **Step 5: Commit**
```bash
git add backend/src/
git commit -m "chore: add centralized error handling and security middleware"
```

---

### Task 2: Zod Validation & Route Cleanup

**Files:**
- Create: `backend/src/validations/user.schema.ts`
- Create: `backend/src/validations/workout.schema.ts`
- Modify: `backend/src/routes/duo.ts`
- Modify: `backend/src/routes/workout.ts`

- [ ] **Step 1: Define Schemas**
Create Zod schemas for `acceptInvite`, `createWorkout`, etc.

- [ ] **Step 2: Refactor Routes to use Zod**
Replace manual `if (!userId)` checks with `schema.parse(req.body)`.

- [ ] **Step 3: Remove Try/Catch from Routes**
Use an `asyncHandler` wrapper or rely on the global error handler (if using Express 5 or a wrapper) to keep routes clean.

- [ ] **Step 4: Commit**
```bash
git add backend/src/validations/ backend/src/routes/
git commit -m "refactor: implement zod validation and clean up route handlers"
```
