import supertest from 'supertest';
import http from 'http';
import { app } from '../../../../../server';

describe('getTodoById', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should send a status 200 and a body id if there is a todo with this id', async () => {
    const id = 1;
    const response = await supertest(app).get(`/todos/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', id.toString());
  });

  it('should send a status 404 and a message if there is not a todo with this id', async () => {
    const id = 127312731237;
    const response = await supertest(app).get(`/todos/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no todos with id ${id}`);
  });
});
