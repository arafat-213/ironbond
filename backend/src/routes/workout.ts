import { Router } from 'express';
import { WorkoutService } from '../services/WorkoutService';
import { validate } from '../middleware/validate';
import { createWorkoutSchema, getWorkoutHistorySchema } from '../validations/workout.schema';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Log a workout
router.post(
  '/',
  validate(createWorkoutSchema),
  asyncHandler(async (req: any, res: any) => {
    const { userId, type, weight, reps } = req.body;
    const workout = await WorkoutService.createWorkout(userId, type, weight, reps);
    res.status(201).json(workout);
  })
);

// Get workout history for a user
router.get(
  '/history/:userId',
  validate(getWorkoutHistorySchema),
  asyncHandler(async (req: any, res: any) => {
    const { userId } = req.params;
    const workouts = await WorkoutService.getUserWorkouts(userId as string);
    res.json(workouts);
  })
);

export default router;
