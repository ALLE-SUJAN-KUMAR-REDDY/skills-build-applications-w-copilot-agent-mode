import express from 'express';
import { getApiBaseUrl } from './config/apiBaseUrl';
import { connectDatabase } from './config/database';
import activitiesRouter from './routes/activitiesRoutes';
import leaderboardRouter from './routes/leaderboardRoutes';
import teamsRouter from './routes/teamsRoutes';
import usersRouter from './routes/usersRoutes';
import workoutsRouter from './routes/workoutsRoutes';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', baseUrl: getApiBaseUrl() });
});

app.get('/api/config', (_req, res) => {
  res.status(200).json({ baseUrl: getApiBaseUrl() });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled API error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`API listening on ${getApiBaseUrl()}`);
    });
  } catch (error) {
    console.error('Failed to start API server:', error);
    process.exit(1);
  }
};

void startServer();