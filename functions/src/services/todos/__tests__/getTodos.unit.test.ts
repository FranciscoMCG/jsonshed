import mock from 'mock-fs';

import { getTodos } from '../getTodos';

const fakeContent = 'fake content';

describe('getTodos', () => {
  afterEach(mock.restore);

  it('returns content when file exists', async () => {
    mock({
      'src/data/': {
        'todos.json': fakeContent,
      },
    });

    const get = await getTodos();
    expect(get).toBe(fakeContent);
  });

  //TODO test when there is no file
});
