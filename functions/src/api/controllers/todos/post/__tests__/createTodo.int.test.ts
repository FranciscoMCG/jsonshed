import supertest, { SuperTest } from 'supertest';
import http from 'http';

import { app } from '../../../../../server';
import { fakeTodo } from '../../__mocks__/postTodo';

describe('createTodo', () => {
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

  it('should send a 201 and the todo when it is created', async () => {
    const response = await request.post('/todos').send(fakeTodo);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(fakeTodo));
  });
});
