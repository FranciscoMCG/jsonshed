import { Request, Response, NextFunction } from 'express';

import { getPostsService } from '../../../../services/posts';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { Post } from '../../../../../declarations/api';

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let post: Post | undefined;
    const result = await getPostsService();
    const posts = JSON.parse(result);
    const newPostId = (posts.length + 1).toString();

    if (req.body.length) {
      post = req.body.map((post: Post, index: number) => {
        return {
          ...post,
          id: (posts.length + index + 1).toString(),
        };
      });
    } else {
      post = {
        ...req.body,
        id: newPostId,
      };
    }

    res.status(201).send(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await getPostsService();
    const posts = JSON.parse(result);
    const post = findById(posts, req.params.id);

    if (!post)
      throw new HTTP404Error(`There are no posts with id ${req.params.id}`);

    res.send('ok');
  } catch (err) {
    next(err);
  }
};
