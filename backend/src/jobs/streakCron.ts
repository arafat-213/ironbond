import cron from 'node-cron';
import { StreakService } from '../services/StreakService';

export const initStreakCron = () => {
  // Run every day at midnight (0 0 * * *)
  cron.schedule('0 0 * * *', async () => {
    console.log('Running daily streak evaluation...');
    try {
      await StreakService.evaluateAllDuos();
      console.log('Streak evaluation completed.');
    } catch (error) {
      console.error('Error during streak evaluation:', error);
    }
  });
};
