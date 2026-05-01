import prisma from '../lib/prisma';

export class StepService {
  static async syncSteps(userId: string, count: number, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

    const existingLog = await prisma.stepLog.findFirst({
      where: {
        userId,
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });

    if (existingLog) {
      return prisma.stepLog.update({
        where: { id: existingLog.id },
        data: { count },
      });
    } else {
      return prisma.stepLog.create({
        data: {
          userId,
          count,
          date: startOfDay,
        },
      });
    }
  }

  static async getDuoLeaderboard(duoId: string) {
    const duo = await prisma.duo.findUnique({
      where: { id: duoId },
      include: { users: true },
    });

    if (!duo) {
      throw new Error('Duo not found');
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const results = await Promise.all(
      duo.users.map(async (user) => {
        const stepLog = await prisma.stepLog.findFirst({
          where: {
            userId: user.id,
            date: {
              gte: today,
              lt: tomorrow,
            },
          },
        });

        return {
          userId: user.id,
          name: user.name,
          steps: stepLog ? stepLog.count : 0,
        };
      })
    );

    return results;
  }
}
