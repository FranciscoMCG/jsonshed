import mock from 'mock-fs';

import { getPosts } from '../getPosts';

const fakeContent = 'fake content';

describe('getPosts', () => {
  afterEach(mock.restore);

  it('returns content when file exists', async () => {
    mock({
      'src/data/': {
        'posts.json': fakeContent,
      },
    });

    const get = await getPosts();
    expect(get).toBe(fakeContent);
  });

  //TODO test when there is no file
});
