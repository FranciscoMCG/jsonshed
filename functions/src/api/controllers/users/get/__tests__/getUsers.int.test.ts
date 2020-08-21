import supertest, { SuperTest } from 'supertest';
import http from 'http';
import { app } from '../../../../../';
import {
  fakeFilteredBody_1,
  fakeFilteredBody_2,
  fakeFilteredPaginatedBody_1,
  fakeFilteredPaginatedBody_2,
  fakePaginatedBody,
} from '../../__mocks__/getUsers';

describe('getUsers', () => {
  let server: http.Server;
  let request: SuperTest<any>;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    request = supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  describe('/users', () => {
    it('should send a status 200 and a body if there is data', async () => {
      const response = await request.get('/users');
      expect(response.status).toBe(200);
    });
  });

  describe('when filtering by query params', () => {
    it('should filter with 1 param', async () => {
      const response = await request.get('/users?firstName=Claudia');
      expect(response.body).toStrictEqual(fakeFilteredBody_1);
    });

    it('should filter with 2 params', async () => {
      const response = await request.get('/users?lastName=Murazik');
      expect(response.body).toStrictEqual(fakeFilteredBody_2);
    });

    it('should return a 404 when there are no parameters matching the query', async () => {
      const response = await request.get('/users?emai=Leanne_Crist');
      expect(response.status).toBe(404);
    });

    it('should return a 404 when a value for the query is not provided', async () => {
      const response = await request.get('/users?email=');
      expect(response.status).toBe(404);
    });

    it('should return a [] when there are no results ', async () => {
      const response = await request.get('/users?email=asdasd');
      expect(response.body).toStrictEqual([]);
    });
  });

  describe('when using pagination', () => {
    it('should return paginated results', async () => {
      const response = await request.get('/users?page=2&limit=2');
      expect(response.body).toStrictEqual(fakePaginatedBody);
    });

    it('should return filtered paginated results with 1 param', async () => {
      const response = await request.get('/users?firstName=a&page=2&limit=2');
      expect(response.body).toStrictEqual(fakeFilteredPaginatedBody_1);
    });

    it('should return filtered paginated results with 2 params', async () => {
      const response = await request.get(
        '/users?firstName=a&lastName=a&page=1&limit=1',
      );
      expect(response.body).toStrictEqual(fakeFilteredPaginatedBody_2);
    });
  });
});
