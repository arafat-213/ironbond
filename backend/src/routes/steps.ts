import { Router } from 'express';
import { StepService } from '../services/StepService';

const router = Router();

router.post('/sync', async (req, res) => {
  try {
    const { userId, count } = req.body;
    if (!userId || count === undefined) {
      return res.status(400).json({ error: 'userId and count are required' });
    }
    const log = await StepService.syncSteps(userId, Number(count), new Date());
    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to sync steps' });
  }
});

router.get('/leaderboard/:duoId', async (req, res) => {
  try {
    const { duoId } = req.params;
    const leaderboard = await StepService.getDuoLeaderboard(duoId);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message || 'Failed to fetch leaderboard' });
  }
});

export default router;
