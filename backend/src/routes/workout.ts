import { Router } from 'express';
import { WorkoutService } from '../services/WorkoutService';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { userId, type, volume } = req.body;
    if (!userId || !type || volume === undefined) {
      return res.status(400).json({ error: 'userId, type, and volume are required' });
    }
    const workout = await WorkoutService.createWorkout(userId, type, volume);
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout' });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const workouts = await WorkoutService.getUserWorkouts(userId);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

export default router;
