import { Router } from 'express';
import { HeatmapService } from '../services/HeatmapService';

const router = Router();

router.get('/heatmap/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const heatmapData = await HeatmapService.getHeatmapData(userId);
    res.json(heatmapData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch heatmap data' });
  }
});

export default router;
