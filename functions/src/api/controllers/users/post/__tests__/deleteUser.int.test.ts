import supertest, { SuperTest } from 'supertest';
import http from 'http';
import { app } from '../../../../../server';

describe('deleteUser', () => {
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
  it('should send a 200 a message when a user is deleted', async () => {
    const response = await request.delete('/users/1');

    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
  });

  it('should send a 404 and a mesasage if the user does not exist', async () => {
    const id = 127312731237;
    const response = await request.delete(`/users/${id}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe(`There are no users with id ${id}`);
  });
});
