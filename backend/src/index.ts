import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import duoRoutes from './routes/duo';
import workoutRoutes from './routes/workout';
import statsRoutes from './routes/stats';
import stepRoutes from './routes/steps';
import { initStreakCron } from './jobs/streakCron';
import { initMvpCron } from './jobs/mvpCron';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Security Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use('/api/duo', duoRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/steps', stepRoutes);

app.get('/', (req, res) => {
  res.send('IronBond API is running');
});

// Initialize jobs
initStreakCron();
initMvpCron();

// Error Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
