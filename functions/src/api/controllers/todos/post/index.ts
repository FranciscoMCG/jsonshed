import { Request, Response, NextFunction } from 'express';

import { getTodosService } from '../../../../services/todos';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { Todo } from '../../../../../declarations/api';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let todo: Todo | undefined;
    const result = await getTodosService();
    const todos = JSON.parse(result);
    const newTodoId = (todos.length + 1).toString();

    if (req.body.length) {
      todo = req.body.map((todo: Todo, index: number) => {
        return {
          ...todo,
          id: (todos.length + index + 1).toString(),
        };
      });
    } else {
      todo = {
        ...req.body,
        id: newTodoId,
      };
    }

    res.status(201).send(todo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
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

    res.send('ok');
  } catch (err) {
    next(err);
  }
};
