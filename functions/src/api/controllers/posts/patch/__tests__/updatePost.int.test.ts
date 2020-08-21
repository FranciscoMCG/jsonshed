import supertest from 'supertest';
import http from 'http';

import { app } from '../../../../..';
import { fakeBody, fakeBodyWithId } from '../../__mocks__/updatePost';

describe('updatePost', () => {
  let server: http.Server;

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
    supertest(server);
  });

  afterAll(done => {
    server.close(done);
  });

  it('should send a 200 and the post when it is updated', async () => {
    const id = 1;
    const response = await supertest(app).patch(`/posts/${id}`).send(fakeBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(fakeBody));
  });

  it('should send a status 404 and a message if there is not a post with this id', async () => {
    const id = 127312731237;
    const response = await supertest(app).patch(`/posts/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no posts with id ${id}`);
  });

  it('should send a status 400 and a message if the body has an id', async () => {
    const id = 1;
    const response = await supertest(app)
      .patch(`/posts/${id}`)
      .send(fakeBodyWithId);

    expect(response.status).toBe(400);
    expect(response.text).toBe(`You cannot change the post id`);
  });
});
