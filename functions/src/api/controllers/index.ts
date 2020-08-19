import express from 'express';
import getUsersRoutes from './users';
import getTodosRoutes from './todos';
import getPostsRoutes from './posts';

const getRouter = () => {
  const router = express.Router();
  router.use('/users', getUsersRoutes());
  router.use('/todos', getTodosRoutes());
  router.use('/posts', getPostsRoutes());
  return router;
};

export default getRouter;
