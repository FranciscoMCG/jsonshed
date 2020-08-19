import supertest from 'supertest';
import http from 'http';

import { app } from '../../../../../server';
import {
  fakeBody,
  fakeBodyWithId,
  fakeBodyIncomplete,
} from '../../__mocks__/putUser';

describe('putUser', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should send a 200 and the user when it is updated', async () => {
    const id = 1;
    const response = await supertest(app).put(`/users/${id}`).send(fakeBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(fakeBody));
  });

  it('should send a status 404 and a message if there is not a user with this id', async () => {
    const id = 127312731237;
    const response = await supertest(app).put(`/users/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no users with id ${id}`);
  });

  it('should send a status 400 and a message if the body has an id', async () => {
    const id = 1;
    const response = await supertest(app)
      .put(`/users/${id}`)
      .send(fakeBodyWithId);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`You cannot change the user id`);
  });

  it('should send a status 400 and a message if not all keys are provided', async () => {
    const id = 1;
    const response = await supertest(app)
      .put(`/users/${id}`)
      .send(fakeBodyIncomplete);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`You need to provide all keys`);
  });
});
