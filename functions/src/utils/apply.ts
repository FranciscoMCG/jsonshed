import { Router } from 'express';

type Wrapper = (router: Router) => void;

export const applyMiddleware = (
  middlewareWrappers: Wrapper[],
  router: Router,
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export const applyRoutes = (path: string, app: Router, router: Router) => {
  return app.use(path, router);
};
