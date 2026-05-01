import prisma from '../lib/prisma';

export class MVPService {
  static async calculateWeeklyMVP(duoId: string): Promise<string | null> {
    const duo = await prisma.duo.findUnique({
      where: { id: duoId },
      include: { users: true },
    });

    if (!duo || duo.users.length === 0) {
      return null;
    }

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const userScores: { userId: string; score: number }[] = [];

    for (const user of duo.users) {
      const workouts = await prisma.workout.findMany({
        where: {
          userId: user.id,
          timestamp: {
            gte: lastWeek,
          },
        },
      });

      const stepLogs = await prisma.stepLog.findMany({
        where: {
          userId: user.id,
          date: {
            gte: lastWeek,
          },
        },
      });

      const workoutCount = workouts.length;
      const totalVolume = workouts.reduce((sum, w) => sum + w.volume, 0);
      const totalSteps = stepLogs.reduce((sum, s) => sum + s.count, 0);

      const score = (workoutCount * 100) + (totalVolume / 1000) + (totalSteps / 100);
      userScores.push({ userId: user.id, score });
    }

    // Sort by score descending
    userScores.sort((a, b) => b.score - a.score);

    // If there's a tie, the first one (highest score) wins. 
    // If multiple people have the same highest score, the sort order determines it.
    // If all scores are 0, we set MVP to null.
    const winnerId = userScores.length > 0 && userScores[0].score > 0 ? userScores[0].userId : null;

    await prisma.duo.update({
      where: { id: duoId },
      data: { weeklyMvpId: winnerId },
    });

    return winnerId;
  }

  static async processAllDuos() {
    const duos = await prisma.duo.findMany();
    for (const duo of duos) {
      try {
        await this.calculateWeeklyMVP(duo.id);
      } catch (error) {
        console.error(`Error calculating MVP for Duo ${duo.id}:`, error);
      }
    }
  }
}
