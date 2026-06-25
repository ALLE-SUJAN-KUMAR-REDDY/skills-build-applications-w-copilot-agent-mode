import { Router } from 'express';
import { WorkoutModel } from '../models/Workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_req, res, next) => {
  try {
    const workouts = await WorkoutModel.find().lean();
    res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;
