import express from 'express';

import { getTodos, getTodoById } from './get';
import { createTodo, deleteTodo } from './post';
import { updateTodo } from './patch';
import { putTodo } from './put';

const getTodosRoutes = () => {
  const router = express.Router();

  router.get('/', getTodos);
  router.get('/:id', getTodoById);

  router.post('/', createTodo);

  router.delete('/:id', deleteTodo);

  router.patch('/:id', updateTodo);

  router.put('/:id', putTodo);

  return router;
};

export default getTodosRoutes;
