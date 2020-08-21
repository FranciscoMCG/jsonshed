import supertest, { SuperTest } from 'supertest';
import http from 'http';

import { app } from '../../../../..';
import { fakePost } from '../../__mocks__/postPost';

describe('createPost', () => {
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

  it('should send a 201 and the post when it is created', async () => {
    const response = await request.post('/posts').send(fakePost);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(fakePost));
  });
});
