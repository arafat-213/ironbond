import prisma from '../lib/prisma';

export class StreakService {
  static async evaluateAllDuos() {
    const duos = await prisma.duo.findMany({
      include: { users: true }
    });

    // We check for workouts logged in the "yesterday" UTC window
    const yesterdayStart = new Date();
    yesterdayStart.setUTCDate(yesterdayStart.getUTCDate() - 1);
    yesterdayStart.setUTCHours(0, 0, 0, 0);

    const yesterdayEnd = new Date(yesterdayStart);
    yesterdayEnd.setUTCHours(23, 59, 59, 999);

    for (const duo of duos) {
      if (duo.users.length !== 2) continue;

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
            lastStreakUpdate: new Date()
          }
        });
      } else {
        await prisma.duo.update({
          where: { id: duo.id },
          data: { sharedStreak: 0 }
        });
      }
    }
  }
}
