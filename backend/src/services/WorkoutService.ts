import prisma from '../lib/prisma';

export class WorkoutService {
  static async createWorkout(userId: string, type: string, volume: number) {
    return prisma.workout.create({
      data: {
        userId,
        type,
        volume,
      },
    });
  }

  static async getUserWorkouts(userId: string) {
    return prisma.workout.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }
}
