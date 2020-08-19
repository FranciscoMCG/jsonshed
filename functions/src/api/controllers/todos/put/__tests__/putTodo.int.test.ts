import supertest from 'supertest';
import http from 'http';

import { app } from '../../../../../server';
import {
  fakeBody,
  fakeBodyWithId,
  fakeBodyIncomplete,
} from '../../__mocks__/putTodo';

describe('putTodo', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should send a 200 and the todo when it is updated', async () => {
    const id = 1;
    const response = await supertest(app).put(`/todos/${id}`).send(fakeBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(fakeBody));
  });

  it('should send a status 404 and a message if there is not a todo with this id', async () => {
    const id = 127312731237;
    const response = await supertest(app).put(`/todos/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no todos with id ${id}`);
  });

  it('should send a status 400 and a message if the body has an id', async () => {
    const id = 1;
    const response = await supertest(app)
      .put(`/todos/${id}`)
      .send(fakeBodyWithId);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`You cannot change the todo id`);
  });

  it('should send a status 400 and a message if not all keys are provided', async () => {
    const id = 1;
    const response = await supertest(app)
      .put(`/todos/${id}`)
      .send(fakeBodyIncomplete);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`You need to provide all keys`);
  });
});
