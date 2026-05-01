import { Router } from 'express';
import prisma from '../lib/prisma';
import { validate } from '../middleware/validate';
import { acceptInviteSchema } from '../validations/duo.schema';
import { asyncHandler } from '../utils/asyncHandler';
import { StreakService } from '../services/StreakService';
import { MVPService } from '../services/MVPService';
import { HeatmapService } from '../services/HeatmapService';
import { StepService } from '../services/StepService';

const router = Router();

// Accept an invite code
router.post('/accept', validate(acceptInviteSchema), asyncHandler(async (req, res) => {
  const { userId, inviteCode } = req.body;
  
  const partner = await prisma.user.findUnique({ where: { inviteCode } });
  if (!partner || partner.duoId) return res.status(400).json({ error: "Invalid invite" });

  if (userId === partner.id) {
    return res.status(400).json({ error: "You cannot duo with yourself" });
  }

  // Ensure the current user isn't already in a duo
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!currentUser || currentUser.duoId) return res.status(400).json({ error: "User already in a duo" });

  const newDuo = await prisma.duo.create({
    data: {
      users: { connect: [{ id: userId }, { id: partner.id }] }
    }
  });

  res.json(newDuo);
}));

// Get duo status for dashboard
router.get('/status/:userId', asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { duo: { include: { users: true } } }
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const duo = user.duo;
  const partner = duo?.users.find(u => u.id !== userId);

  // 1. Streak
  const streakCount = duo?.sharedStreak || 0;

  // 2. Partner Status (Did they work out today?)
  let partnerFinished = false;
  if (partner) {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

    const workoutCount = await prisma.workout.count({
      where: {
        userId: partner.id,
        timestamp: { gte: today, lt: tomorrow }
      }
    });
    partnerFinished = workoutCount > 0;
  }

  // 3. Weekly MVP
  let weeklyMVP = { name: 'None', stat: 'Keep grinding' };
  if (duo?.weeklyMvpId) {
    const mvpUser = duo.users.find(u => u.id === duo.weeklyMvpId);
    if (mvpUser) {
      weeklyMVP = { 
        name: mvpUser.name, 
        stat: 'Weekly Top Performer' 
      };
    }
  }

  // 4. Heatmaps (aggregated heat score)
  const meHeatmap = await HeatmapService.getHeatmapData(userId);
  const meHeatScore = meHeatmap.length > 0 
    ? meHeatmap.reduce((acc, curr) => acc + curr.heatScore, 0) / meHeatmap.length 
    : 0;

  let partnerHeatScore = 0;
  if (partner) {
    const partnerHeatmap = await HeatmapService.getHeatmapData(partner.id);
    partnerHeatScore = partnerHeatmap.length > 0 
      ? partnerHeatmap.reduce((acc, curr) => acc + curr.heatScore, 0) / partnerHeatmap.length 
      : 0;
  }

  // 5. Steps
  let steps = { me: 0, partner: 0 };
  if (duo) {
    const leaderboard = await StepService.getDuoLeaderboard(duo.id);
    const meSteps = leaderboard.find(l => l.userId === userId)?.steps || 0;
    const partnerSteps = leaderboard.find(l => l.userId !== userId)?.steps || 0;
    steps = { me: meSteps, partner: partnerSteps };
  }

  const status = {
    streakCount,
    partnerName: partner?.name || 'No Partner',
    partnerFinished,
    weeklyMVP,
    heatmaps: {
      me: meHeatScore,
      partner: partnerHeatScore,
    },
    steps
  };

  res.json(status);
}));

export default router;
