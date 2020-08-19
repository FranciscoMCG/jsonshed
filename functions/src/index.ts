import * as functions from 'firebase-functions';
import express from 'express';

import { applyMiddleware } from './utils';
import middleware from './api/middleware';
import errorHandlers from './api/middleware/errorHandlers';
import getRouter from './api/controllers';
import { applyRoutes } from './utils/apply';

export const app = express();
const router = getRouter();

applyMiddleware(middleware, app);
applyRoutes('/', app, router);
applyMiddleware(errorHandlers, app);

export const server = functions.https.onRequest(app);
