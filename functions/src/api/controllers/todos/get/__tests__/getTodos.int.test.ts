import supertest, { SuperTest } from 'supertest';
import http from 'http';
import { app } from '../../../../../';
import {
  fakeFilteredBody_1,
  fakeFilteredBody_2,
  fakeFilteredPaginatedBody_1,
  fakeFilteredPaginatedBody_2,
  fakePaginatedBody,
  fakeFilteredCompletedBody,
} from '../../__mocks__/getTodos';

describe('getTodos', () => {
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

  describe('/todos', () => {
    it('should send a status 200 and a body if there is data', async () => {
      const response = await request.get('/todos');
      expect(response.status).toBe(200);
    });
  });

  describe('when filtering by query params', () => {
    it('should filter with 1 param', async () => {
      const response = await request.get('/todos?title=fugiat');
      expect(response.body).toStrictEqual(fakeFilteredBody_1);
    });

    it('should filter with 2 params', async () => {
      const response = await request.get('/todos?title=c&completed=true');
      expect(response.body).toStrictEqual(fakeFilteredBody_2);
    });

    it('should filter by completed', async () => {
      const response = await request.get('/todos?completed=true');
      expect(response.body).toStrictEqual(fakeFilteredCompletedBody);
    });

    it('should return a 404 when there are no parameters matching the query', async () => {
      const response = await request.get('/todos?emai=Leanne_Crist');
      expect(response.status).toBe(404);
    });

    it('should return a 404 when a value for the query is not provided', async () => {
      const response = await request.get('/todos?completed=');
      expect(response.status).toBe(404);
    });

    it('should return a [] when there are no results ', async () => {
      const response = await request.get('/todos?title=asdasd');
      expect(response.body).toStrictEqual([]);
    });
  });

  describe('when using pagination', () => {
    it('should return paginated results', async () => {
      const response = await request.get('/todos?page=2&limit=2');
      expect(response.body).toStrictEqual(fakePaginatedBody);
    });

    it('should return filtered paginated results with 1 param', async () => {
      const response = await request.get('/todos?title=b&page=2&limit=2');
      expect(response.body).toStrictEqual(fakeFilteredPaginatedBody_1);
    });

    it('should return filtered paginated results with 2 params', async () => {
      const response = await request.get(
        '/todos?title=a&completed=true&page=2&limit=2',
      );
      expect(response.body).toStrictEqual(fakeFilteredPaginatedBody_2);
    });
  });
});
