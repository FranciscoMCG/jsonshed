import { Request, Response, NextFunction } from 'express';

import { getTodosService } from '../../../../services/todos';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { Todo, Controller } from '../../../../../declarations/api';
import { findById } from '../../../../utils/features/findById';

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let todo: Controller | undefined;
    const result = await getTodosService();
    const todos: Todo[] = JSON.parse(result);
    todo = findById(todos, req.params.id);

    if (!todo)
      throw new HTTP404Error(`There are no todos with id ${req.params.id}`);

    if (req.body.id) throw new HTTP400Error('You cannot change the todo id');

    if (todo) todo.id = req.params.id;

    Object.keys(todo).forEach(key => {
      if (todo && key in req.body) todo[key] = req.body[key];
    });

    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
};
