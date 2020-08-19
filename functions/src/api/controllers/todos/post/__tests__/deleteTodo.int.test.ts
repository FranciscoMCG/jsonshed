import supertest, { SuperTest } from 'supertest';
import http from 'http';

import { app } from '../../../../../server';

describe('deleteTodo', () => {
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
  it('should send a 200 a message when a todo is deleted', async () => {
    const response = await request.delete('/todos/1');

    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
  });

  it('should send a 404 and a message if the todo does not exist', async () => {
    const id = 127312731237;
    const response = await request.delete(`/todos/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no todos with id ${id}`);
  });
});
