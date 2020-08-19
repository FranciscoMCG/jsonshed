import { BuildRes, BuildReq } from './factories.d';

export const buildRes = (overridesRes?: BuildRes) => {
  // TODO type res
  const res: any = {
    send: jest.fn(() => res).mockName('send'),
    status: jest.fn(() => res).mockName('status'),
    ...overridesRes,
  };
  return res;
};

export const buildReq = (
  { controller, ...overridesReq }: BuildReq = {} as BuildReq,
): BuildReq => {
  const req: BuildReq = { controller, body: {}, params: {}, overridesReq };
  return req;
};

export const buildNext = (err?: any): jest.Mock<unknown, any[]> => {
  return jest.fn(err).mockName('next');
};
