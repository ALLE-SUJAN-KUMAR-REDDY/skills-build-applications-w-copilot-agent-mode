import { Router } from 'express';
import { UserModel } from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (_req, res, next) => {
  try {
    const users = await UserModel.find().lean();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
