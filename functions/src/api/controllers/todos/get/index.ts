import { Request, Response, NextFunction } from 'express';

import { getTodosService } from '../../../../services/todos';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { filterByQueryParam } from '../../../../utils';
import { Todo } from '../../../../../declarations/api';

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let todos: Todo[];
    const result = await getTodosService();
    const hasQueryParams = Object.keys(req.query).length > 0;

    todos = JSON.parse(result);

    if (!todos) throw new HTTP404Error('There are no todos');

    if (!hasQueryParams) {
      todos = todos;
    }
    if (hasQueryParams) {
      const todoByQueryParam = filterByQueryParam(todos, req.query);
      todos = todoByQueryParam;
    }

    res.status(200).send(todos);
  } catch (err) {
    next(err);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getTodosService();
    const todos = JSON.parse(result);
    const todo = findById(todos, req.params.id);

    if (!todo)
      throw new HTTP404Error(`There are no todos with id ${req.params.id}`);

    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
};
