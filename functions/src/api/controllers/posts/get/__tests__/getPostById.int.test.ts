import supertest from 'supertest';
import http from 'http';
import { app } from '../../../../..';

describe('getPostById', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should send a status 200 and a body id if there is a post with this id', async () => {
    const id = 1;
    const response = await supertest(app).get(`/posts/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', id.toString());
  });

  it('should send a status 404 and a message if there is not a post with this id', async () => {
    const id = 127312731237;
    const response = await supertest(app).get(`/posts/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no posts with id ${id}`);
  });
});
