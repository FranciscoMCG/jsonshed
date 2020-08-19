import { Request, Response, NextFunction } from 'express';

import { getPostsService } from '../../../../services/posts';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { Post, Controller } from '../../../../../declarations/api';
import { findById } from '../../../../utils/features/findById';

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let post: Controller | undefined;
    const result = await getPostsService();
    const posts: Post[] = JSON.parse(result);
    post = findById(posts, req.params.id);

    if (!post)
      throw new HTTP404Error(`There are no posts with id ${req.params.id}`);

    if (req.body.id) throw new HTTP400Error('You cannot change the post id');

    if (post) post.id = req.params.id;

    Object.keys(post).forEach(key => {
      if (post && key in req.body) post[key] = req.body[key];
    });

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};
