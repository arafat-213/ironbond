import prisma from '../lib/prisma';

export class HeatmapService {
  static async getHeatmapData(userId: string) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const workouts = await prisma.workout.findMany({
      where: {
        userId,
        timestamp: {
          gte: sevenDaysAgo,
        },
      },
    });

    const volumeByType: Record<string, number> = {};

    workouts.forEach((workout) => {
      if (!volumeByType[workout.type]) {
        volumeByType[workout.type] = 0;
      }
      volumeByType[workout.type] += workout.volume;
    });

    const heatmapData = Object.keys(volumeByType).map((type) => {
      const totalVolume = volumeByType[type];
      const heatScore = Math.min(totalVolume / 10000, 1);
      return {
        type,
        totalVolume,
        heatScore,
      };
    });

    return heatmapData;
  }
}
