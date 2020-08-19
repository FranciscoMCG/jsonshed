import supertest, { SuperTest } from 'supertest';
import http from 'http';

import { app } from '../../../../../server';
import { fakeUser } from '../../__mocks__/postUser';

describe('createUser', () => {
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

  it('should send a 201 and the user when it is created', async () => {
    const response = await request.post('/users').send(fakeUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(fakeUser));
  });
});
