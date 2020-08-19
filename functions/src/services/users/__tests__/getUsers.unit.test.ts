import mock from 'mock-fs';

import { getUsers } from '../getUsers';

const fakeContent = 'fake content';

describe('getUsers', () => {
  afterEach(mock.restore);

  it('returns content when file exists', async () => {
    mock({
      'src/data/': {
        'users.json': fakeContent,
      },
    });

    const get = await getUsers();
    expect(get).toBe(fakeContent);
  });

  //TODO test when there is no file
});
