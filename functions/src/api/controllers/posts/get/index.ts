import { Request, Response, NextFunction } from 'express';

import { getPostsService } from '../../../../services/posts';
import { HTTP404Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { filterByQueryParam } from '../../../../utils';
import { Post } from '../../../../../declarations/api';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let posts: Post[];
    const result = await getPostsService();
    const hasQueryParams = Object.keys(req.query).length > 0;
    posts = JSON.parse(result);

    if (!posts) throw new HTTP404Error('There are no posts');

    if (!hasQueryParams) {
      posts = posts;
    }
    if (hasQueryParams) {
      const postByQueryParam = filterByQueryParam(posts, req.query);
      posts = postByQueryParam;
    }

    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (
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

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};
