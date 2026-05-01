import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import duoRoutes from './routes/duo';
import workoutRoutes from './routes/workout';
import statsRoutes from './routes/stats';
import { initStreakCron } from './jobs/streakCron';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/duo', duoRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/stats', statsRoutes);

app.get('/', (req, res) => {
  res.send('Gym Duo API is running');
});

// Initialize jobs
initStreakCron();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
