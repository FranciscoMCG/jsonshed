import * as functions from 'firebase-functions';
// import https from 'https';
import express from 'express';

import { applyMiddleware } from './utils';
import middleware from './api/middleware';
import errorHandlers from './api/middleware/errorHandlers';
import getRouter from './api/controllers';
// import { logger } from './config/logger';
import { applyRoutes } from './utils/apply';

// const { PORT = 4000 } = process.env;

export const app = express();
const router = getRouter();

applyMiddleware(middleware, app);
applyRoutes('/', app, router);
applyMiddleware(errorHandlers, app);

// const server = https.createServer(app);

// if (process.env.NODE_ENV !== 'test') {
//   server.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
// }

export const server = functions.https.onRequest(app);
