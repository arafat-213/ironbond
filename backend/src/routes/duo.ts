import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// Accept an invite code
router.post('/accept', async (req, res) => {
  const { userId, inviteCode } = req.body;
  
  try {
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
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
