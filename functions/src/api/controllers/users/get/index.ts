import { Request, Response, NextFunction } from 'express';

import { getUsersService } from '../../../../services/users';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { filterByQueryParam } from '../../../../utils';
import { User } from '../../../../../declarations/api';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let users: User[];
    const result = await getUsersService();
    const hasQueryParams = Object.keys(req.query).length > 0;

    users = JSON.parse(result);

    if (!users) throw new HTTP404Error('There are no users');

    if (!hasQueryParams) {
      users = users;
    }
    if (hasQueryParams) {
      const userByQueryParam = filterByQueryParam(users, req.query);
      users = userByQueryParam;
    }

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
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

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
