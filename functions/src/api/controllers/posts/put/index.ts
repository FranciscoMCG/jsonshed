import { Request, Response, NextFunction } from 'express';

import { getPostsService } from '../../../../services/posts';
import { HTTP404Error, HTTP400Error } from '../../../../errors/httpErrors';
import { findById } from '../../../../utils/features/findById';
import { Controller } from '../../../../../declarations/api';

export const putPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let post: Controller | undefined;
    const result = await getPostsService();
    const posts = JSON.parse(result);
    post = findById(posts, req.params.id);

    if (!post)
      throw new HTTP404Error(`There are no posts with id ${req.params.id}`);

    const updateKeys = Object.keys(req.body);
    const hasUpdateId = updateKeys.includes('id');
    const postKeys = Object.keys(post);
    const keysToUpdate = postKeys.filter(id => id !== 'id');
    const isValidUpdate =
      updateKeys.length === keysToUpdate.length &&
      updateKeys
        .sort()
        .every((value, index) => value === keysToUpdate.sort()[index]);

    if (hasUpdateId) {
      throw new HTTP400Error('You cannot change the post id');
    }

    if (!isValidUpdate) throw new HTTP400Error(`You need to provide all keys`);

    Object.keys(post).forEach(key => {
      if (post) post[key] = req.body[key];
      if (post) post.id = req.params.id;
    });

    res.status(200).send(post);
  } catch (err) {
    next(err);
  }
};
