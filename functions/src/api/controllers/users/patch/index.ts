import { Request, Response, NextFunction } from 'express';

import { getUsersService } from '../../../../services/users';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { User, Controller } from '../../../../../declarations/api';
import { findById } from '../../../../utils/features/findById';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user: Controller | undefined;
    const result = await getUsersService();
    const users: User[] = JSON.parse(result);
    user = findById(users, req.params.id);

    if (!user)
      throw new HTTP404Error(`There are no users with id ${req.params.id}`);

    if (req.body.id) throw new HTTP400Error('You cannot change the user id');

    if (user) user.id = req.params.id;

    Object.keys(user).forEach(key => {
      if (user && key in req.body) user[key] = req.body[key];
    });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
