import { Request, Response, NextFunction } from 'express';

import { getTodosService } from '../../../../services/todos';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { Controller } from '../../../../../declarations/api';

export const putTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let todo: Controller | undefined;
    const result = await getTodosService();
    const todos = JSON.parse(result);
    todo = findById(todos, req.params.id);

    if (!todo)
      throw new HTTP404Error(`There are no todos with id ${req.params.id}`);

    const updateKeys = Object.keys(req.body);
    const hasUpdateId = updateKeys.includes('id');
    const todoKeys = Object.keys(todo);
    const keysToUpdate = todoKeys.filter(id => id !== 'id');
    const isValidUpdate =
      updateKeys.length === keysToUpdate.length &&
      updateKeys
        .sort()
        .every((value, index) => value === keysToUpdate.sort()[index]);

    if (hasUpdateId) {
      throw new HTTP400Error('You cannot change the todo id');
    }

    if (!isValidUpdate) throw new HTTP400Error(`You need to provide all keys`);

    Object.keys(todo).forEach(key => {
      if (todo) todo[key] = req.body[key];
      if (todo) todo.id = req.params.id;
    });

    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
};
