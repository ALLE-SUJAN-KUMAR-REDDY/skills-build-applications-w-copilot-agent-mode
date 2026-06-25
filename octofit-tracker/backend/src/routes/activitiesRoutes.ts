import { Router } from 'express';
import { ActivityModel } from '../models/Activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_req, res, next) => {
  try {
    const activities = await ActivityModel.find().lean();
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
});

export default activitiesRouter;
