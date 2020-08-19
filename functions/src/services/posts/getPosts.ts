import { promises, existsSync } from 'fs';

import { postsDataPath } from '../../utils';
import { logger } from '../../config/logger';

export const getPosts = async () => {
  if (!existsSync(postsDataPath)) {
    logger.error('File not found');
  }

  const data = await promises.readFile(postsDataPath, 'utf8');
  return data;
};
