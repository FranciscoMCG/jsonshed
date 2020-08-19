import express from 'express';

import { getUsers, getUserById } from './get';
import { createUser, deleteUser } from './post';
import { updateUser } from './patch';
import { putUser } from './put';

const getUsersRoutes = () => {
  const router = express.Router();

  router.get('/', getUsers);
  router.get('/:id', getUserById);

  router.post('/', createUser);

  router.delete('/:id', deleteUser);

  router.patch('/:id', updateUser);

  router.put('/:id', putUser);

  return router;
};

export default getUsersRoutes;
