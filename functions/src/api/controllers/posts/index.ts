import express from 'express';

import { getPosts, getPostById } from './get';
import { createPost, deletePost } from './post';
import { updatePost } from './patch';
import { putPost } from './put';

const getPostsRoutes = () => {
  const router = express.Router();

  router.get('/', getPosts);
  router.get('/:id', getPostById);

  router.post('/', createPost);

  router.delete('/:id', deletePost);

  router.patch('/:id', updatePost);

  router.put('/:id', putPost);

  return router;
};

export default getPostsRoutes;
