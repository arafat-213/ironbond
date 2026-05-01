# Fix Workout History Route Type Error Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the TypeScript error in `backend/src/routes/workout.ts` by adding Zod validation for the `userId` parameter in the GET `/history/:userId` route.

**Architecture:** Define a new Zod schema `getWorkoutHistorySchema` in `workout.schema.ts` to validate `req.params`. Apply this schema using the `validate` middleware in the workout history route.

**Tech Stack:** TypeScript, Express, Zod

---

### Task 1: Update Workout Schema

**Files:**
- Modify: `backend/src/validations/workout.schema.ts`

- [ ] **Step 1: Add `getWorkoutHistorySchema` to `workout.schema.ts`**

```typescript
export const getWorkoutHistorySchema = z.object({
  params: z.object({
    userId: z.string().uuid()
  })
});
```

### Task 2: Update Workout Route

**Files:**
- Modify: `backend/src/routes/workout.ts`

- [ ] **Step 1: Import `getWorkoutHistorySchema` and use `validate` middleware in the history route**

```typescript
router.get('/history/:userId', validate(getWorkoutHistorySchema), asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const workouts = await WorkoutService.getUserWorkouts(userId);
  res.json(workouts);
}));
```

### Task 3: Verify and Build

- [ ] **Step 1: Run TypeScript compiler to verify the fix**

Run: `npx tsc -p backend/tsconfig.json` (or equivalent build command)
Expected: No errors in `backend/src/routes/workout.ts`

### Task 4: Commit Changes

- [ ] **Step 1: Commit the fix**

```bash
git add backend/src/validations/workout.schema.ts backend/src/routes/workout.ts
git commit -m "fix: resolve TS error in workout history route by adding Zod validation"
```
