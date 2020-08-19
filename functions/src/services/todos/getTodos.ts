import { promises, existsSync } from 'fs';

import { todosDataPath } from '../../utils';
import { logger } from '../../config/logger';

export const getTodos = async () => {
  if (!existsSync(todosDataPath)) {
    logger.error('File not found');
  }

  const data = await promises.readFile(todosDataPath, 'utf8');
  return data;
};
