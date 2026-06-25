import { Router } from 'express';
import { LeaderboardModel } from '../models/Leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardModel.find().sort({ rank: 1 }).lean();
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;
