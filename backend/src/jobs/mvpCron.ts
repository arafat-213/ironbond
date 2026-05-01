import cron from 'node-cron';
import { MVPService } from '../services/MVPService';

export const initMvpCron = () => {
  // Run every Sunday at midnight (0 0 * * 0)
  cron.schedule('0 0 * * 0', async () => {
    console.log('Running weekly MVP evaluation...');
    try {
      await MVPService.processAllDuos();
      console.log('Weekly MVP evaluation completed.');
    } catch (error) {
      console.error('Error during weekly MVP evaluation:', error);
    }
  });
};
