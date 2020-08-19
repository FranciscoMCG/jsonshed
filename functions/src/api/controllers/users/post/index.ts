import { Request, Response, NextFunction } from 'express';

import { getUsersService } from '../../../../services/users';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { User } from '../../../../../declarations/api';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user: User | undefined;
    const result = await getUsersService();
    const users = JSON.parse(result);
    const newUserId = (users.length + 1).toString();

    if (req.body.length) {
      user = req.body.map((user: User, index: number) => {
        return {
          ...user,
          id: (users.length + index + 1).toString(),
        };
      });
    } else {
      user = {
        ...req.body,
        id: newUserId,
      };
    }

    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getUsersService();
    const users = JSON.parse(result);
    const user = findById(users, req.params.id);

    if (!user)
      throw new HTTP404Error(`There are no users with id ${req.params.id}`);

    res.send('ok');
  } catch (err) {
    next(err);
  }
};
