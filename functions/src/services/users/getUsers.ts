import { promises, existsSync } from 'fs';

import { usersDataPath } from '../../utils';
import { logger } from '../../config/logger';

export const getUsers = async () => {
  if (!existsSync(usersDataPath)) {
    logger.error('File not found');
  }

  const data = await promises.readFile(usersDataPath, 'utf8');
  return data;
};
