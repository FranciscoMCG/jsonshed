import { clientError, serverError } from '../ErrorHandler';
import { HTTPClientError } from '../httpErrors';
import { buildRes, buildNext } from '../../testUtils';

const next = buildNext();

describe('errorHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('clientError', () => {
    it('should send a 400 when error is instance of HTTPClientError', async () => {
      const res = buildRes();

      class FakeClass extends HTTPClientError {
        statusCode = 400;
      }
      const fakeHttpClientError = new FakeClass('error message');

      try {
        clientError(fakeHttpClientError, res, next);
      } catch (e) {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.status).toHaveBeenCalledTimes(1);
      }
    });

    it('calls next() if error is not an instance of HTTPClientError', () => {
      const res = buildRes();

      const fakeHttpClientError = new Error('error message');

      try {
        clientError(fakeHttpClientError, res, next);
      } catch (e) {
        expect(next).toHaveBeenCalled();
      }
    });
  });

  describe('serverError', () => {
    const fakeHttpServerError = {
      status: 500,
      name: 'httpServerError',
      message: 'fake error',
    };
    it('should send a 500 if NODE_ENV is set to production', () => {
      const res = buildRes();

      process.env = Object.assign(process.env, { NODE_ENV: 'production' });

      try {
        serverError(fakeHttpServerError, res, next);
      } catch (e) {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalledTimes(1);
      }
    });

    it('should send a 500 if NODE_ENV is not set', async () => {
      const res = buildRes();

      try {
        await serverError(fakeHttpServerError, res, next);
      } catch (e) {
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalledTimes(1);
      }
    });
  });
});
