import { Request, Response, NextFunction } from 'express';

import { getUsersService } from '../../../../services/users';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { Controller } from '../../../../../declarations/api';

export const putUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let user: Controller | undefined;
    const result = await getUsersService();
    const users = JSON.parse(result);
    user = findById(users, req.params.id);

    if (!user)
      throw new HTTP404Error(`There are no users with id ${req.params.id}`);

    const updateKeys = Object.keys(req.body);
    const hasUpdateId = updateKeys.includes('id');
    const userKeys = Object.keys(user);
    const keysToUpdate = userKeys.filter(id => id !== 'id');
    const isValidUpdate =
      updateKeys.length === keysToUpdate.length &&
      updateKeys
        .sort()
        .every((value, index) => value === keysToUpdate.sort()[index]);

    if (hasUpdateId) {
      throw new HTTP400Error('You cannot change the user id');
    }

    if (!isValidUpdate) throw new HTTP400Error(`You need to provide all keys`);

    Object.keys(user).forEach(key => {
      if (user) user[key] = req.body[key];
      if (user) user.id = req.params.id;
    });

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};
