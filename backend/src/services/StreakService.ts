import prisma from '../lib/prisma';

export class StreakService {
  static async evaluateAllDuos() {
    const duos = await prisma.duo.findMany({
      include: { users: true }
    });

    const now = new Date();
    
    // Today boundary (to prevent multiple runs)
    const todayStart = new Date(now);
    todayStart.setUTCHours(0, 0, 0, 0);

    // Yesterday boundaries
    const yesterdayStart = new Date(now);
    yesterdayStart.setUTCDate(yesterdayStart.getUTCDate() - 1);
    yesterdayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setUTCHours(23, 59, 59, 999);

    for (const duo of duos) {
      try {
        if (duo.users.length !== 2) continue;

        // Idempotency: skip if already evaluated today
        if (duo.lastStreakUpdate >= todayStart) {
          continue;
        }

        let bothWorkedOut = true;
        for (const user of duo.users) {
          const workoutCount = await prisma.workout.count({
            where: {
              userId: user.id,
              timestamp: { gte: yesterdayStart, lte: yesterdayEnd }
            }
          });
          
          if (workoutCount === 0) {
            bothWorkedOut = false;
            break;
          }
        }

        if (bothWorkedOut) {
          await prisma.duo.update({
            where: { id: duo.id },
            data: {
              sharedStreak: { increment: 1 },
              lastStreakUpdate: now
            }
          });
        } else {
          await prisma.duo.update({
            where: { id: duo.id },
            data: { 
              sharedStreak: 0,
              lastStreakUpdate: now 
            }
          });
        }
      } catch (error) {
        console.error(`Error evaluating duo ${duo.id}:`, error);
      }
    }
  }
}
